export class MyRegExp {
  static RegUrl = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/\w+)*\/?$/;
  static RegUrlWithParameter =
    /((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\\.,@?^=%&:/~\\+#]*[\w\-\\@?^=%&/~\\+#])?/;

  static PasswordRegex =
    // eslint-disable-next-line no-useless-escape
    /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?![~`!@#$%\^&*\\|()_\-=+\\、{}\[\]'"<>?.,:;/]+$)[a-zA-Z\d~`!@#$%\^&*\\|()_\-=+\\、{}\[\]'"<>?.,:;/]{6,16}$/;
  static PasswordRegexNoSymbol =
    // eslint-disable-next-line no-useless-escape
    /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)[a-zA-Z\d]{6,16}$/;
}
