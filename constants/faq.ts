export interface Question {
  title: string;
  text: string;
}
export const FAQ = [
  {
    title: "Why stake in this beautiful meta-staking pool?",
    text: `Several Reasons:<ul>
    <li>You <i>tokenize your stake</i> so now you can use mpETH in the emerging ETH DEFI market while you
      keep earning staking rewards. Liberate your stake now!!</li>
    <li>Once you stake here, you can do <i>Liquid Unstakes</i>, meaning you can get your ETH back without waiting for the Shanghai Upgrade.</li>
    <li>You avoid putting all eggs in one basket. This contract activates validators for every 32 ETH. And you greatly reduce the risk of getting no-rewards due the SSV technology. SSV mitigates risk and reduces failures by combining individual nodes into a robust, decentralized network that can outperform any individual staking service in robustness, uptime, and security. Validators run portions of their validator key (KeyShares) across different staking setups run by independent operators joined together by a consensus layer.</li>
    <li>By distributing stake, you contribute to decentralization and censorship-resistance for the ETH
      protocol</li>`,
  },
  {
    title: "What's mpETH?",
    text: `<b>mpETH</b> is the token this contract manages,
    representing your share of the MetaPool stake. After staking, you can use your <b>mpETH</b> in other markets while
    still earning rewards.
    Every second, the <b>mpETH</b> price will increase as staking-rewards are added to the pool. 
    <b>mpETH</b> price will always increase as long as there are staking rewards.
    After each epoch, the <b>mpETH</b> price will increase as staking-rewards are added to the pool.
    <b>mpETH</b> price will always increase as long as there are staking rewards.`,
  },
  {
    title: `How does the "Liquid Unstake" works?`,
    text: `Within the contract there's a <i>Liquidity Pool</i>, the pool works like an
    "single-direction swap pool" allowing you to swap <b>mpETH</b> for ETH paying a "swap fee".
    The fee increases when there's low liquidity in the pool and decreases when the liquidity is abundant.`,
  },
  {
    title: `Who provides the ETH for Liquid Unstake?`,
    text: `Anyone can become a liquidity provider for the liquid unstake functionality. 
    Liquidity providers get part of the liquid unstake fee. Check the "Liquidity" section.`,
  },
  {
    title: `Why my staking is not reflected in the "staking" section of my ETH Wallet?`,
    text: `Good question! The meta-pool staking is reflected in you holding <b>mpETH tokens</b>,
    it will not be reflected in the wallet as "staking", it will be reflected as <b>mpETH tokens</b>. 
    Add mpETH to wallet: 0xd2275C1bc599BcDf21985a9cF810eFB0fEe0CE5f`,
  },
  {
    title: `I want to know more about the meta-pool`,
    text: `Join us in our <a style="color:#8542eb;text-decoration:underline" href="https://discord.gg/tG4XJzRtdQ" target="_blank">Discord Server</a>.<br><br>
    Follow us on <a style="color:#8542eb;text-decoration:underline" href="https://twitter.com/meta_pool" target="_blank">Twitter</a> and <a style="color:#8542eb;text-decoration:underline"
      href="https://medium.com/@meta_pool">Medium</a><br><br>
    The Open Source documentation for the protocol is in this <a style="color:#8542eb;text-decoration:underline"
      href="https://github.com/Narwallets/meta-pool" target="_blank">Github repo</a>.<br><br>
    Please review the <a style="color:#8542eb;text-decoration:underline" href="https://metapool.app/Tokenomics__Governance_-_Meta_Pool_v4.pdf" target="_blank">Tokenomics &amp;
      Governance</a> and <a style="color:#8542eb;text-decoration:underline" href="https://metapool.app/legal-notice-risk-disclosures.html" target="_blank">Legal &amp; Risk
      Disclosure</a>.`,
  },
];
