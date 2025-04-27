import { type DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import { type JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react'
// import your custom blocks if you have them
// import { ContentWithMedia } from '@/blocks/ContentWithMedia/Component'
// import { TableOfContents } from '@/blocks/TableOfContents/Component'
import { internalDocToHref } from './internalLink'
import { headingConverter } from './headingConverter'

// If you have custom block types, import their types here
// import type { TableOfContents as TableOfContentsProps, ContentWithMedia as ContentWithMediaProps } from '@/payload-types'

type NodeTypes = DefaultNodeTypes // | SerializedBlockNode<TableOfContentsProps | ContentWithMediaProps>

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...headingConverter,
  // blocks: {
  //   contentWithMedia: ({ node }) => <ContentWithMedia {...node.fields} />,
  //   tableOfContents: ({ node }) => <TableOfContents {...node.fields} />,
  // },
})
