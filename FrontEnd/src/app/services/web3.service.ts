import { Injectable, Output, EventEmitter } from '@angular/core';
import { Contract, ethers } from 'ethers';
import Web3 from 'web3';
import { environment } from 'src/environments/environment';
import CrowdFundingAbi from 'src/app/abis/Crowdfunding.json';
import ERC20 from 'src/app/abis/ERC20.json';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable()
export class Web3Service {
  web3: Web3;
  defaultProvider: ethers.providers.JsonRpcProvider;
  gasLimit?: number;
  gasPrice: number;
  account?: string;
  library?: ethers.providers.Web3Provider;

  constructor() {
    this.web3 = new Web3(environment.network.defaultProvider);
    this.defaultProvider = new ethers.providers.JsonRpcProvider(
      environment.network.defaultProvider,
      environment.network.chainId
    );
    this.gasPrice = 50 * 10 ** 9;

    this.web3.eth.getBlock('latest').then((data) => {
      this.gasLimit = data.gasLimit;
    });

    if (localStorage.getItem('web3_connected') != null) {
      this.login();
    }
  }

  login() {
    return new Promise((resolve, reject) => {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts: any[]) => {
          localStorage.setItem('web3_connected', 'true');
          this.account = accounts[0];
          this.library = new ethers.providers.Web3Provider(window.ethereum);
          resolve(null);
        })
        .catch((e: any) => {
          console.log(e);
          reject(e);
        });
    });
  }

  getAccount(): string | undefined {
    return this.account;
  }

  isWeb3Connected(): boolean {
    return this.account !== undefined;
  }

  _assertAuthenticated() {
    if (!this.isWeb3Connected())
      throw Error('You must be connected in order to do this action');
  }

  getCrowdfundingContract(addr: string): Contract {
    this._assertAuthenticated();
    return this.getContract(addr, CrowdFundingAbi.abi);
  }

  getContract(address: string, abi: any) {
    let signer: any = this.defaultProvider;

    if (this.account) {
      signer = this.library?.getSigner(this.account).connectUnchecked();
    }

    return new Contract(address, abi, signer);
  }

  async getAllowance(subject: string, on: string) {
    this._assertAuthenticated();
    const contract = this.getContract(subject, ERC20.abi);
    return contract['allowance'](this.account, on);
  }

  async approve(subject: string, on: string) {
    this._assertAuthenticated();
    console.log(`Trying to approve ${subject} on ${on}`);
    const contract = this.getContract(subject, ERC20.abi);
    try {
      return await contract['approve'](
        on,
        '100000000000000000000000000000000000000000000000000'
      );
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
