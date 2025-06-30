import 'package:biddo/core/controllers/auction.dart';
import 'package:connectivity_plus/connectivity_plus.dart';

import 'package:easy_debounce/easy_debounce.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:biddo/theme/extensions/base.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:get/get.dart';

import '../../../../core/controllers/main.dart';
import '../../../../core/models/auction.dart';
import '../../../../core/repositories/auction.dart';
import '../../../../widgets/auction-card/index.dart';
import '../../../../widgets/common/banner_ad.dart';
import '../../../../widgets/common/no_internet_connection.dart';
import '../../../../widgets/no_data.dart';
import '../../../../widgets/shimmers/auctions_list.dart';
import 'app_bar.dart';

class AllAuctionsScreen extends StatefulWidget {
  const AllAuctionsScreen({
    super.key,
  });

  @override
  // ignore: library_private_types_in_public_api
  _AllAuctionsScreen createState() => _AllAuctionsScreen();
}

class _AllAuctionsScreen extends State<AllAuctionsScreen> {
  final auctionsController = Get.find<AuctionController>();
  final mainController = Get.find<MainController>();

  final List<Rx<Auction>> _auctions = [];
  var _loading = false;
  var _initialLoading = false;

  late int _pageNumber;
  late bool _isLastPage;
  String _query = '';
  AuctionsSortBy? _sortBy;

  static const _pageSize = 20;

  @override
  void initState() {
    super.initState();

    _pageNumber = 0;
    _isLastPage = false;
    fetchData(true);
  }

  void goBack() {
    Navigator.of(context).pop();
  }

  Future<void> fetchData([bool isInitialLoading = false]) async {
    if (_loading || _isLastPage) {
      return;
    }

    try {
      if (mounted) {
        setState(() {
          _loading = true;

          if (isInitialLoading) {
            _initialLoading = true;
          }
        });
      }

      var newItemsFunct = auctionsController.loadAuctionsByPage(
        _pageNumber,
        _pageSize,
        _query,
        _sortBy,
      );

      final newItems = await newItemsFunct;
      if (mounted) {
        setState(() {
          _isLastPage = newItems.length < _pageSize;
          _loading = false;
          _pageNumber = _pageNumber + 1;
          _auctions.addAll(newItems.map((e) => e.obs));
          if (isInitialLoading) {
            _initialLoading = false;
          }
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _loading = false;
          if (isInitialLoading) {
            _initialLoading = false;
          }
        });
      }
    }
  }

  Future<void> handleSortChange(AuctionsSortBy? sortBy) async {
    if (_loading) {
      return;
    }

    try {
      if (mounted) {
        setState(() {
          _loading = true;
          _pageNumber = 0;
          _isLastPage = false;
          _sortBy = sortBy;
          _auctions.clear();
        });
      }

      var newItemsFunct = auctionsController.loadAuctionsByPage(
        _pageNumber,
        _pageSize,
        _query,
        sortBy,
      );

      final newItems = await newItemsFunct;
      if (mounted) {
        setState(() {
          _isLastPage = newItems.length < _pageSize;
          _loading = false;
          _pageNumber = _pageNumber + 1;
          _auctions.addAll(newItems.map((e) => e.obs));
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _loading = false;
        });
      }
    }
  }

  Future<void> handleQueryChange(String query) async {
    if (_loading || _query == query) {
      return;
    }

    if (query.isEmpty) {
      if (mounted) {
        setState(() {
          _query = '';
          _pageNumber = 0;
          _isLastPage = false;
          _auctions.clear();
        });
      }
      fetchData();
      return;
    }

    try {
      if (mounted) {
        setState(() {
          _loading = true;
          _query = query;
          _pageNumber = 0;
          _isLastPage = false;
          _auctions.clear();
        });
      }

      var newItemsFunct = auctionsController.loadAuctionsByPage(
        _pageNumber,
        _pageSize,
        _query,
      );

      final newItems = await newItemsFunct;
      if (mounted) {
        setState(() {
          _isLastPage = newItems.length < _pageSize;
          _loading = false;
          _pageNumber = _pageNumber + 1;
          _auctions.addAll(newItems.map((e) => e.obs));
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _loading = false;
        });
      }
    }
  }

  Widget _renderContent() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: MasonryGridView.count(
        itemCount: _auctions.length + 1,
        crossAxisCount: 2,
        mainAxisSpacing: 8,
        crossAxisSpacing: 8,
        itemBuilder: (context, index) {
          if (index == _auctions.length) {
            return _loading
                ? SizedBox(
                    height: 100,
                    width: Get.width,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        SizedBox(
                          height: 20,
                          width: 20,
                          child: IntrinsicHeight(
                            child: CircularProgressIndicator(
                              strokeWidth: 3,
                              color: Theme.of(context)
                                  .extension<CustomThemeFields>()!
                                  .fontColor_1,
                            ),
                          ),
                        )
                      ],
                    ),
                  )
                : Container();
          }

          if (index > 1 && index % 8 == 0) {
            return Column(
              children: [
                BannerAdCard(
                  marginTop: 0,
                  marginBottom: 8,
                ),
                SizedBox(
                  child: AuctionCard(
                    auction: _auctions[index],
                  ),
                )
              ],
            );
          }

          if (index > 1 && (index - 1) % 8 == 0) {
            return Column(
              children: [
                BannerAdCard(
                  marginTop: 0,
                  marginBottom: 8,
                ),
                SizedBox(
                  child: AuctionCard(
                    auction: _auctions[index],
                  ),
                )
              ],
            );
          }

          return SizedBox(
            child: AuctionCard(
              auction: _auctions[index],
            ),
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
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
        child: AllAuctionsAppBar(
          loadingData: _loading,
          onSort: (AuctionsSortBy? sortBy) {
            EasyDebounce.debounce(
              'sort-all-auctions',
              const Duration(milliseconds: 300),
              () => handleSortChange(sortBy),
            );
          },
          onScrollBottom: () {
            fetchData();
          },
          onSearchKeyUpdate: (String key) {
            EasyDebounce.debounce(
              'search-all-auctions',
              const Duration(milliseconds: 300),
              () => handleQueryChange(key),
            );
          },
          child: Obx(
            () => mainController.connectivity.contains(ConnectivityResult.none)
                ? const NoInternetConnectionScreen()
                : _initialLoading
                    ? AuctionsListShimmer(
                        auctionsCount:
                            auctionsController.allActiveAuctionsCount.value,
                      )
                    : _auctions.isNotEmpty || _loading
                        ? _renderContent()
                        : NoDataMessage(
                            message: _query.length > 1
                                ? tr(
                                    'home.auctions.no_auctions_to_match_criteria')
                                : tr('home.auctions.no_auctions_to_display'),
                          ),
          ),
        ),
      ),
    );
  }
}
