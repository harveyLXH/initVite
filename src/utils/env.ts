const env = () => {
  const environment = import.meta.env.VITE_APP_NODE_ENV
  switch (environment) {
    case 'dev':
      console.log('开发环境')
      break
    case 'test':
      console.log('测试环境')
      break
    case 'prod':
      console.log('生产环境')
      break
    default:
      break
  }
}

export { env }
