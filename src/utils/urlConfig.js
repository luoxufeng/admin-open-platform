let obj = {}
switch (process.env.VUE_APP_CURRENTMODE) {
  case 'development': // 本地环境
    obj = {
      PROURI: '/',
      redirectUrl: 'http://localhost:8082',
      logoutUrl: 'http://localhost:8082',
      oauthUrl:
        'http://61.152.207.98/enduser/sp/sso/ytojwt9?enterpriseId=yto&redirect_url='
    }
    break
  case 'dev': // 178环境
    obj = {
      PROURI: 'http://10.130.36.178',
      redirectUrl:
        'http://61.152.207.98/enduser/sp/logout/ytojwt9?enterpriseId=yto&force=true',
      logoutUrl:
        'http://61.152.207.98/enduser/sp/logout/ytojwt9?enterpriseId=yto&force=true',
      oauthUrl:
        'http://61.152.207.98/enduser/sp/sso/ytojwt9?enterpriseId=yto&redirect_url='
    }
    break
  case 'test': // 213环境
    obj = {
      PROURI: 'http://10.130.36.213',
      redirectUrl:
        'http://61.152.207.98/enduser/sp/logout/ytojwt19?enterpriseId=yto&force=true',
      logoutUrl:
        'http://61.152.207.98/enduser/sp/logout/ytojwt19?enterpriseId=yto&force=true',
      oauthUrl:
        'http://61.152.207.98/enduser/sp/sso/ytojwt19?enterpriseId=yto&redirect_url='
    }
    break

  case 'production':
    obj = {
      PROURI: 'http://mdm.yto56.com.cn', // 请求基本路径
      redirectUrl:
        'http://idp.yto56.com.cn/enduser/sp/sso/ytojwt6?enterpriseId=yto', // 重定向路径
      logoutUrl:
        'http://idp.yto56.com.cn/enduser/sp/logout/ytojwt6?enterpriseId=yto&force=true', // 退出url
      oauthUrl:
        'http://idp.yto56.com.cn/enduser/sp/sso/ytojwt6?enterpriseId=yto&redirect_url=' // 无授权登录页
    }
    break
}

export default obj
