import React, { useEffect, useState } from 'react'
// @ts-ignore
import { Box, Text } from '@adminjs/design-system'
import { ApiClient } from 'adminjs'

const api = new ApiClient()

const ParentCategoryName = ({ record }) => {
  const [parentCategory, setParentCategory] = useState(null)
  const [parentCategoryId, setParentCategoryId] = useState('')
  const parentId = record?.params?.parentCategoryId

  useEffect(() => {
    if (!parentId) return

    const fetchParentCategory = async () => {
      try {
        const { data } = await api.recordAction({
          resourceId: 'categories',
          recordId: parentId,
          actionName: 'show',
        })

        if (data && data.record) {
          setParentCategory(data.record.title['en'] || `Category ID: ${parentId}`)
          setParentCategoryId(data.record.id)
        } else {
          setParentCategory(`Unknown Category (ID: ${parentId})`)
        }
      } catch (error) {
        console.error('Error fetching parent category:', error)
        setParentCategory(`Unknown Category (ID: ${parentId})`)
      }
    }

    fetchParentCategory()
  }, [parentId])

  return (
    <Box>
      <Text>
        <a style={{ color: 'rgb(0, 123, 255)', textDecoration: 'none' }} href={`/admin/resources/categories/records/${parentCategoryId}/show`}>
          {parentCategory || '-'}
        </a>
      </Text>
    </Box>
  )
}

export default ParentCategoryName
