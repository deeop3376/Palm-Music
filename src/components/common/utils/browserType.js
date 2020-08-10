function browser(ua){
    let userBrowser=ua.toLowerCase()
    if(/wechat/i.test(userBrowser) && /micromessenger/i.test(userBrowser)){
        return 'weChat'
    }
    else if(/mobile/i.test(userBrowser) && /ucbrowser/i.test(userBrowser)){
        return 'Mobile UC'
    }else if(/mobile/i.test(userBrowser) && /mqqbrowser/i.test(userBrowser)){
        return 'Mobile QQ'
    }else if(/mobile/i.test(userBrowser) && /chrome/i.test(userBrowser)){
        return 'Mobile Chrome'
    }else if(/chrome/i.test(userBrowser) && /webkit/i.test(userBrowser) && /mozilla/i.test(userBrowser)){
        return 'PC Chrome'
    }
}

export default browser