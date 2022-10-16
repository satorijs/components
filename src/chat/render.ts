import segment from '@satorijs/element'
import { FunctionalComponent, h } from 'vue'

const render: FunctionalComponent<segment[]> = (elements, ctx) => {
  return elements.map(({ type, attrs, children }) => {
    if (type === 'text') {
      return attrs.content
    } else if (type === 'at') {
      return h('span', `@${attrs.name}`)
    } else if (type === 'image') {
      return h('img', { src: attrs.url })
    } else if (type === 'audio') {
      return h('audio', { src: attrs.url, controls: true })
    } else if (type === 'video') {
      return h('video', { src: attrs.url, controls: true })
    } else if (type === 'p' || type === 'message') {
      return h('p', render(children, ctx))
    } else {
      return render(children, ctx)
    }
  })
}

export default render
