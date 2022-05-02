import Environment from "../config/environment";

export class UrlGen {
  public static getBlockExplorerTxUrl(txHash: string) {
    return `${Environment.BlockExplorer}/tx/${txHash}`
  }

  public static getBlockExplorerContractUrl() {
    return `${Environment.BlockExplorer}/address/${Environment.MevCubeContractAddress}`
  }

  public static getTwitterSocialUrl() {
    return "https://twitter.com/mevcube";
  }

  public static getGithubSocialUrl() {
    return "https://github.com/andrewaarestad/mevcube-frontend";
  }
}
