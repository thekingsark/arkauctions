import 'package:biddo/core/controllers/auction.dart';
import 'package:biddo/theme/colors.dart';
import 'package:biddo/widgets/common/simple_button.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:biddo/theme/extensions/base.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';
import 'package:readmore/readmore.dart';
import '../../core/controllers/account.dart';
import '../../core/controllers/bid.dart';
import '../../core/controllers/categories.dart';
import '../../core/controllers/favourites.dart';
import '../../core/controllers/filter.dart';
import '../../core/controllers/flash.dart';
import '../../core/controllers/last_seen_auctions.dart';
import '../../core/controllers/main.dart';
import '../../core/models/auction.dart';
import '../../core/models/bid.dart';
import '../../core/navigator.dart';
import '../../core/services/lang_detector.dart';
import '../../utils/generic.dart';
import '../../widgets/auction-card/widgets/auction_card_status.dart';
import '../../widgets/common/banner_ad.dart';
import '../../widgets/common/category_icon.dart';
import '../../widgets/common/no_internet_connection.dart';
import '../../widgets/common/section_heading.dart';
import '../create-auction/widgets/location_preview.dart';
import '../home/auctions/filtered-auctions/index.dart';
import '../home/auctions/map-auctions/index.dart';
import 'app_bar.dart';
import 'bids/bids_list.dart';
import 'widgets/auctioneer.dart';
import 'widgets/bottom_nav_bar.dart';
import 'comments/comments_button.dart';
import 'widgets/distance_from_current_account.dart';
import 'widgets/history_event_card.dart';
import 'widgets/horizontal_auctions_list.dart';
import 'widgets/reviews.dart';
import 'widgets/shimmer.dart';

class AuctionDetailsScreen extends StatefulWidget {
  final String auctionId;
  final int assetsLen;
  final bool? isNewAuction;
  final Function? onBack;

  const AuctionDetailsScreen({
    super.key,
    required this.auctionId,
    required this.assetsLen,
    this.isNewAuction = false,
    this.onBack,
  });

  @override
  // ignore: library_private_types_in_public_api
  _AuctionDetailsScreen createState() => _AuctionDetailsScreen();
}

class _AuctionDetailsScreen extends State<AuctionDetailsScreen>
    with SingleTickerProviderStateMixin {
  final lastSeenAuctionsController = Get.find<LastSeenAuctionsController>();
  final auctionsController = Get.find<AuctionController>();
  final bidsController = Get.find<BidController>();
  final flashController = Get.find<FlashController>();
  final mainController = Get.find<MainController>();
  final auctionController = Get.find<AuctionController>();
  final categoriesController = Get.find<CategoriesController>();
  final favouritesController = Get.find<FavouritesController>();
  final filterController = Get.find<FilterController>();
  final navigationService = Get.find<NavigatorService>();
  final languageDetectorService = Get.find<LanguageDetectorService>();
  final accountController = Get.find<AccountController>();

  var _loadingAuction = true;
  var _reloadingData = false;

  var _translationInProgress = false;
  var _showTranslatedDetails = false;
  var _translatedTitle = '';
  var _translatedDescription = '';

  late Rx<Auction>? _auction;
  late RxList<Auction> _auctionsByAuctionOwner = RxList<Auction>();
  late RxList<Auction> _similarAuctions = RxList<Auction>();

  RxBool showFab = false.obs;

  @override
  void initState() {
    loadInitialData();
    super.initState();
  }

  @override
  void dispose() {
    _auctionsByAuctionOwner.clear();
    _auctionsByAuctionOwner.refresh();
    super.dispose();
  }

  Future<void> loadInitialData() async {
    var details = await auctionsController.loadDetails(widget.auctionId);

    if (details == null && mounted) {
      Navigator.of(context).pop();
      flashController
          .showMessageFlash(tr('auction_details.auction_does_not_exit'));
      return;
    }

    lastSeenAuctionsController.storeSeenAuction(details!);

    setState(() {
      _loadingAuction = false;
      _auction = details.obs;
    });

    loadSimilarAuctions();
    loadAuctionsByAuctionOwner();
  }

  void _onScroll(UserScrollNotification notification) {
    if (notification.direction == ScrollDirection.reverse) {
      // Scrolling down → Show the FAB
      if (!showFab.value) {
        showFab.value = true;
        showFab.refresh();
      }
    } else if (notification.direction == ScrollDirection.forward) {
      // Scrolling up → Hide the FAB
      if (showFab.value) {
        showFab.value = false;
        showFab.refresh();
      }
    }
  }

  Future<void> loadSimilarAuctions() async {
    if (_auction == null) {
      return;
    }

    var similarAuctions =
        await auctionController.loadSimilarAuctions(_auction!.value.id);
    if (similarAuctions == null) {
      return;
    }

    _similarAuctions.clear();
    for (var auction in similarAuctions) {
      if (auction.id != _auction!.value.id) {
        _similarAuctions.add(auction);
      }
    }
    _similarAuctions.refresh();
  }

  Future<void> loadAuctionsByAuctionOwner() async {
    if (_auction!.value.auctioneer?.id == null) {
      return;
    }

    var newItemsFunct = await auctionController.loadActiveForAccount(
      _auction!.value.auctioneer!.id,
      0,
      10,
      '',
    );

    _auctionsByAuctionOwner.clear();
    _auctionsByAuctionOwner.addAll(newItemsFunct);
    _auctionsByAuctionOwner.refresh();
  }

  void goBack() {
    if (widget.onBack != null) {
      widget.onBack!(_auction?.value);
      return;
    }

    Navigator.of(context).pop(_auction?.value);
  }

  Future<void> refreshData() async {
    if (_reloadingData) {
      return;
    }
    setState(() {
      _reloadingData = true;
    });

    await loadInitialData();

    if (!mounted) {
      return;
    }

    setState(() {
      _reloadingData = false;
    });
  }

  Future<bool> handlePromote() async {
    var promoted = await auctionsController.promote(_auction!.value.id);
    if (promoted) {
      _auction!.value.promotedAt = DateTime.now();
      _auction!.refresh();
    }

    return promoted;
  }

  Future<void> handleTranslate() async {
    if (_translationInProgress) {
      return;
    }

    if (_showTranslatedDetails) {
      setState(() {
        _showTranslatedDetails = false;
      });
      return;
    }

    if (!_showTranslatedDetails && _translatedTitle.isNotEmpty) {
      setState(() {
        _showTranslatedDetails = true;
      });
      return;
    }

    setState(() {
      _translationInProgress = true;
    });

    try {
      var translated = await auctionController.translateDetails(
        _auction!.value.id,
        context.locale.toString(),
      );

      if (translated == null) {
        flashController.showMessageFlash(tr('generic.short_error'));
        return;
      }

      setState(() {
        _translatedTitle = translated.title!;
        _translatedDescription = translated.description!;
        _showTranslatedDetails = true;
      });
    } catch (error) {
      flashController.showMessageFlash(tr('generic.short_error'));
    } finally {
      setState(() {
        _translationInProgress = false;
      });
    }
  }

  void handleBidCreated(Bid bid) {
    if (_auction?.value == null) {
      return;
    }

    _auction!.value.bids.add(bid.obs);
    _auction?.value.bidsCount += 1;

    _auction!.value.lastPrice = bid.price;
    _auction!.value.lastPriceCurrencyId = bid.initialCurrencyId;
    _auction!.refresh();

    if (mounted) {
      setState(() {
        _auction = _auction;
      });
    }
  }

  Future<bool> removeBidFromAuction(String bidId) async {
    var removed = await bidsController.removeBid(
      _auction!.value.id,
      bidId,
    );

    if (!removed) {
      return false;
    }

    _auction?.value.bids.removeWhere((element) => element.value.id == bidId);
    if (_auction!.value.bidsCount > 0) {
      _auction?.value.bidsCount -= 1;
    }

    if (mounted) {
      setState(() {
        _auction = _auction;
      });
    }

    _auction?.refresh();
    return true;
  }

  Widget _renderTitle() {
    var seeLess = tr('generic.see_less');
    var seeMore = tr('generic.see_more');

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Flexible(
            child: ReadMoreText(
              _showTranslatedDetails ? _translatedTitle : _auction!.value.title,
              trimLines: 2,
              trimLength: 150,
              textAlign: TextAlign.left,
              style: Theme.of(context)
                  .extension<CustomThemeFields>()!
                  .title
                  .copyWith(
                    color: Theme.of(context)
                        .extension<CustomThemeFields>()!
                        .fontColor_1,
                  ),
              trimExpandedText: seeLess,
              trimCollapsedText: seeMore,
              moreStyle: Theme.of(context)
                  .extension<CustomThemeFields>()!
                  .smaller
                  .copyWith(
                    color: Colors.blue,
                    fontWeight: FontWeight.bold,
                  ),
              lessStyle: Theme.of(context)
                  .extension<CustomThemeFields>()!
                  .smaller
                  .copyWith(
                    color: Colors.blue,
                    fontWeight: FontWeight.bold,
                  ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _renderDescription() {
    if (_auction!.value.description.isEmpty) {
      return Container();
    }

    var seeLess = tr('generic.see_less');
    var seeMore = tr('generic.see_more');

    return Container(
      margin: EdgeInsets.only(top: 8),
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Flexible(
            child: ReadMoreText(
              _showTranslatedDetails
                  ? _translatedDescription
                  : _auction!.value.description,
              trimLines: 2,
              trimLength: 150,
              textAlign: TextAlign.left,
              style: Theme.of(context).extension<CustomThemeFields>()!.smaller,
              trimExpandedText: seeLess,
              trimCollapsedText: seeMore,
              moreStyle: Theme.of(context)
                  .extension<CustomThemeFields>()!
                  .smaller
                  .copyWith(
                    color: Colors.blue,
                    fontWeight: FontWeight.bold,
                  ),
              lessStyle: Theme.of(context)
                  .extension<CustomThemeFields>()!
                  .smaller
                  .copyWith(
                    color: Colors.blue,
                    fontWeight: FontWeight.bold,
                  ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _renderTranslateAction() {
    var currentLanguage = context.locale.toString();
    var titleLanguage =
        languageDetectorService.detectLanguage(_auction!.value.title);
    var descriptionLanguage =
        languageDetectorService.detectLanguage(_auction!.value.description);

    var translationEnabled = (titleLanguage != null &&
            titleLanguage != currentLanguage) ||
        (descriptionLanguage != null && descriptionLanguage != currentLanguage);

    if (!translationEnabled) {
      return Container();
    }

    return GestureDetector(
      onTap: () {
        handleTranslate();
      },
      child: Container(
        height: 17,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        margin: EdgeInsets.only(top: 16, bottom: 8),
        child: Row(
          children: [
            _translationInProgress
                ? const SpinKitThreeBounce(
                    color: DarkColors.font_1,
                    size: 17,
                  )
                : Text(
                    _showTranslatedDetails
                        ? 'generic.see_original'
                        : 'generic.translate',
                    style: Theme.of(context)
                        .extension<CustomThemeFields>()!
                        .smallest
                        .copyWith(color: Colors.blue),
                  ).tr(),
          ],
        ),
      ),
    );
  }

  Future<void> handleLoveTap(bool picked) async {
    if (picked) {
      await favouritesController.addAuctionToFavourites(_auction!);
      _auction!.value.likesCount = _auction!.value.likesCount! + 1;
    } else {
      await favouritesController
          .removeAuctionFromFavourites(_auction!.value.id);
      _auction!.value.likesCount = _auction!.value.likesCount! - 1;
      _auction!.refresh();
    }

    auctionController.refreshRecommendations();
  }

  Widget getSubCategoryName(BuildContext context, String subCategoryId) {
    var subCategory = categoriesController.categories
        .expand((element) => element.value.subcategories)
        .firstWhere((element) => element.value.id == subCategoryId);

    // ignore: unnecessary_null_comparison
    if (subCategory == null) {
      return Container();
    }

    var parentCategory = categoriesController.categories.firstWhere(
        (element) => element.value.id == subCategory.value.parentCategoryId);
    // ignore: unnecessary_null_comparison
    if (parentCategory == null) {
      return Container();
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Row(
          children: [
            Flexible(
              child: Text(
                subCategory.value.name[context.locale.toString()]!,
                style:
                    Theme.of(context).extension<CustomThemeFields>()!.smaller,
              ),
            ),
          ],
        ),
        Container(
          height: 8,
        ),
        Row(
          children: [
            Flexible(
              child: Text(
                parentCategory.value.name[context.locale.toString()]!,
                style:
                    Theme.of(context).extension<CustomThemeFields>()!.smallest,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _renderCategory() {
    var currentLanguage = context.locale.toString();
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Theme.of(context)
            .extension<CustomThemeFields>()!
            .background_2
            .withOpacity(0.8),
      ),
      width: Get.width,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            child: Row(
              children: [
                CategoryIcon(
                  currentLanguage: currentLanguage,
                  categoryId: _auction!.value.mainCategoryId,
                ),
                Container(
                  width: 8,
                ),
                Flexible(
                  child: getSubCategoryName(
                      context, _auction!.value.subCategoryId),
                ),
              ],
            ),
          ),
          SimpleButton(
            onPressed: () {
              var mainCategory = categoriesController.categories
                  .firstWhereOrNull(
                      (cat) => cat.value.id == _auction!.value.mainCategoryId);

              if (mainCategory != null) {
                filterController.resetFilter();
                filterController.selectCategory(mainCategory.value);
                navigationService.push(FilteredAuctionsScreen());
              }
            },
            background:
                Theme.of(context).extension<CustomThemeFields>()!.action,
            width: 100,
            height: 30,
            child: Text(
              'generic.see_more',
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(context)
                  .extension<CustomThemeFields>()!
                  .smaller
                  .copyWith(color: DarkColors.font_1),
            ).tr(),
          ),
        ],
      ),
    );
  }

  Widget _renderHistoryEvents() {
    var isPostOwner =
        accountController.account.value.id == _auction!.value.auctioneer!.id;
    if (!isPostOwner) {
      return Container();
    }

    var events = _auction!.value.historyEvents;
    if (events == null || events.isEmpty) {
      return Container();
    }

    var sortedEventsDesc = events.toList();
    sortedEventsDesc.sort((a, b) => b.createdAt.compareTo(a.createdAt));

    return Container(
      margin: EdgeInsets.only(top: 16),
      child: Column(
        children: [
          Divider(
            color: Theme.of(context).extension<CustomThemeFields>()!.separator,
            thickness: 1,
          ),
          SectionHeading(
            title: tr('auction_history.auction_history'),
            withMore: false,
            onPressed: () {},
          ),
          for (var event in sortedEventsDesc)
            AuctionHistoryEventCard(event: event),
        ],
      ),
    );
  }

  Widget _renderLocation() {
    var titleMsg = tr("location.location");

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectionHeading(
          title: titleMsg,
          withMore: false,
          sufix: SimpleButton(
            background:
                Theme.of(context).extension<CustomThemeFields>()!.background_2,
            width: 150,
            height: 30,
            onPressed: () {
              navigationService.push(
                MapAuctionsScreen(
                  initialPosition: _auction!.value.location!,
                ),
              );
            },
            child: Text('map_auctions.show_on_map',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: Theme.of(context)
                        .extension<CustomThemeFields>()!
                        .smaller)
                .tr(),
          ),
        ),
        Container(
          margin: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                _auction!.value.locationPretty ?? '',
                style:
                    Theme.of(context).extension<CustomThemeFields>()!.smaller,
              ),
              DistanceFromCurrentAccount(
                auction: _auction!.value,
              ),
            ],
          ),
        ),
        Container(
          height: 8,
        ),
        SizedBox(
          height: 170,
          child: LocationPreview(
            latLng: _auction!.value.location!,
          ),
        )
      ],
    );
  }

  Widget _renderAuctionStatus() {
    var currentLanguage = context.locale.toString();

    if (_auction!.value.startAt != null && _auction!.value.startedAt == null) {
      return Container(
        margin: EdgeInsets.symmetric(horizontal: 16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Flexible(
              child: Text(
                'starting_soon_auctions.starts_at',
                overflow: TextOverflow.ellipsis,
                style:
                    Theme.of(context).extension<CustomThemeFields>()!.smaller,
              ).tr(),
            ),
            Text(
              DateFormat('d MMM, h:mm a', currentLanguage)
                  .format(_auction!.value.startAt!),
              style: Theme.of(context).extension<CustomThemeFields>()!.smaller,
            ),
          ],
        ),
      );
    }

    return Column(
      children: [
        Container(
          margin: EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'auction_details.auction_ends_in',
                style:
                    Theme.of(context).extension<CustomThemeFields>()!.smaller,
              ).tr(),
              AuctionCardStatus(
                auction: _auction!,
                fontSize: 14,
                fontWeight: FontWeight.bold,
                fontColor: Theme.of(context)
                    .extension<CustomThemeFields>()!
                    .fontColor_1,
              ),
            ],
          ),
        ),
        _auction!.value.promotedAt != null
            ? Container(
                margin: EdgeInsets.only(
                  left: 16,
                  right: 16,
                  top: 24,
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'promote_auction.promoted_at',
                      style: Theme.of(context)
                          .extension<CustomThemeFields>()!
                          .smaller,
                    ).tr(),
                    Text(
                      DateFormat('d MMM, h:mm a', currentLanguage)
                          .format(_auction!.value.promotedAt!),
                      style: Theme.of(context)
                          .extension<CustomThemeFields>()!
                          .smallest
                          .copyWith(
                            fontWeight: FontWeight.bold,
                            color: Theme.of(context)
                                .extension<CustomThemeFields>()!
                                .fontColor_1,
                          ),
                    )
                  ],
                ),
              )
            : Container(),
      ],
    );
  }

  Widget _renderBody() {
    if (_auction == null) {
      return Container();
    }

    return Column(
      children: [
        Container(
          height: 16,
        ),
        _renderCategory(),
        Container(
          height: 16,
        ),
        _renderTitle(),
        _renderDescription(),
        _renderTranslateAction(),
        Container(
          height: 16,
        ),
        BannerAdCard(),
        Container(
          height: 16,
        ),
        Divider(
          color: Theme.of(context).extension<CustomThemeFields>()!.separator,
          thickness: 1,
        ),
        Container(
          color: Theme.of(context)
              .extension<CustomThemeFields>()!
              .background_2
              .withOpacity(0.8),
          padding: EdgeInsets.symmetric(vertical: 16),
          child: _renderAuctionStatus(),
        ),
        Divider(
          color: Theme.of(context).extension<CustomThemeFields>()!.separator,
          thickness: 1,
        ),
        _auction!.value.acceptedBidId != null
            ? Column(
                children: [
                  Container(
                    margin: const EdgeInsets.only(top: 16),
                    child: AuctionDetailsReviews(
                      auction: _auction!,
                    ),
                  ),
                  Divider(
                    color: Theme.of(context)
                        .extension<CustomThemeFields>()!
                        .separator,
                    thickness: 1,
                  ),
                ],
              )
            : Container(),
        AuctionBidsList(
          auction: _auction!,
          removeBidFromAuction: removeBidFromAuction,
        ),
        Container(
          height: 16,
        ),
        Divider(
          color: Theme.of(context).extension<CustomThemeFields>()!.separator,
          thickness: 1,
        ),
        Container(
          color: Theme.of(context)
              .extension<CustomThemeFields>()!
              .background_2
              .withOpacity(0.8),
          padding: EdgeInsets.only(bottom: 8),
          child: AuctionAuctioneer(
            auction: _auction!.value,
          ),
        ),
        Divider(
          color: Theme.of(context).extension<CustomThemeFields>()!.separator,
          thickness: 1,
        ),
        _renderLocation(),
        BannerAdCard(),
        Container(
          height: 16,
        ),
        Divider(
          color: Theme.of(context).extension<CustomThemeFields>()!.separator,
          thickness: 1,
        ),
        Obx(
          () => _similarAuctions.isEmpty
              ? Container()
              : Container(
                  margin: EdgeInsets.only(bottom: 16),
                  child: HorizontalAuctionsList(
                    auctions: _similarAuctions,
                    auctionsCount: _similarAuctions.length,
                    withTitleSufix: false,
                    withSeeMore: false,
                    title: tr('generic.similar_auctions'),
                  ),
                ),
        ),
        Obx(
          () => HorizontalAuctionsList(
            auctions: _auctionsByAuctionOwner,
            auctionsCount: _auctionsByAuctionOwner.length,
            account: _auction!.value.auctioneer!,
            withTitleSufix: false,
            withSeeMore: false,
            title: tr('profile.all_auctions_for', namedArgs: {
              'no': _auctionsByAuctionOwner.length.toString(),
              'name': GenericUtils.generateNameForAccount(
                  _auction!.value.auctioneer!),
            }),
          ),
        ),
        _renderHistoryEvents(),
        Container(
          height: 50,
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return _loadingAuction
        ? AuctionDetailsShimmer(
            assetsLen: widget.assetsLen,
          )
        : PopScope(
            canPop: true,
            onPopInvoked: (didPop) {
              if (!didPop) {
                Navigator.pop(context);
              }
            },
            child: GestureDetector(
              onHorizontalDragEnd: (details) {
                if (details.primaryVelocity! > 0) {
                  Navigator.pop(context); // Swipe right to go back
                }
              },
              child: Listener(
                behavior: HitTestBehavior.opaque,
                onPointerDown: (_) {
                  FocusManager.instance.primaryFocus?.unfocus();
                },
                child: SafeArea(
                  child: Scaffold(
                    backgroundColor: Theme.of(context)
                        .extension<CustomThemeFields>()!
                        .background_1,
                    resizeToAvoidBottomInset: true,
                    body: NotificationListener<UserScrollNotification>(
                      onNotification: (notification) {
                        _onScroll(notification);
                        return false;
                      },
                      child: Obx(
                        () => mainController.connectivity
                                .contains(ConnectivityResult.none)
                            ? const NoInternetConnectionScreen()
                            : AuctionDetailsAppBar(
                                auction: _auction!,
                                refreshData: refreshData,
                                onLikeTap: handleLoveTap,
                                onBack: widget.onBack == null
                                    ? null
                                    : () {
                                        widget.onBack!(_auction?.value);
                                      },
                                content: _renderBody(),
                              ),
                      ),
                    ),
                    bottomNavigationBar: Stack(
                      children: [
                        SafeArea(
                          child: _auction == null
                              ? Container()
                              : AuctionDetailsBottomNavBar(
                                  auction: _auction!,
                                  handleBidCreated: handleBidCreated,
                                  handlePromote: handlePromote,
                                ),
                        ),
                      ],
                    ),
                    floatingActionButton: Obx(
                      () => AnimatedOpacity(
                        duration: Duration(milliseconds: 300),
                        opacity: showFab.value ? 1.0 : 0.0,
                        curve: Curves.easeInOut,
                        child: AnimatedSlide(
                          duration: Duration(milliseconds: 300),
                          offset: showFab.value ? Offset(0, 0) : Offset(0, 0.5),
                          curve: Curves.easeInOut,
                          child: SizedBox(
                            width: MediaQuery.of(context).size.width,
                            child: SizedBox(
                              height: 50,
                              width: Get.width,
                              child: AuctionDetailsCommentsButton(
                                auctionId: _auction!.value.id,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    floatingActionButtonLocation:
                        FloatingActionButtonLocation.centerFloat,
                  ),
                ),
              ),
            ),
          );
  }
}
