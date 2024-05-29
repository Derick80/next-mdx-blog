import CopyToClipboard from '@/components/copy-to-clipboard'
import { BundledLanguage, BundledTheme, codeToHtml } from 'shiki'

type Props = {
  code: string
  lang?: BundledLanguage
  theme?: BundledTheme
}
async function Code({ code, lang = 'typescript', theme = 'nord' }: Props) {
  const codeHTML = await codeToHtml(code, {
    lang: lang,
    theme: theme
  })
  return (
    <div className='relative'>
      <CopyToClipboard code={code} />
      <code
        className='border-t-2 border-neutral-700 text-sm [&>pre]:overflow-x-auto [&>pre]:!bg-neutral-900 [&>pre]:py-3 [&>pre]:pl-4 [&>pre]:pr-5 [&>pre]:leading-snug [&_code]:block [&_code]:w-fit [&_code]:min-w-full'
        dangerouslySetInnerHTML={{ __html: codeHTML }}
      />
    </div>
  )
}

export { Code }
