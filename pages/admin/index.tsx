import dynamic from 'next/dynamic'

const App = dynamic(
  () => {
    return import('@/features/admin/App')
  },
  { ssr: false },
)

export default () => {
  return <App />
}
