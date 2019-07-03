import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var M: any;
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  updateContractForm: boolean;
  contracts = [];
  contract: any = {};
  contractForm: FormGroup;
  updateContractId: any;
  constructor(private cService: ContractService) { }
  get name() { return this.contractForm.get('name'); }
  get address() { return this.contractForm.get('address'); }
  get owner() { return this.contractForm.get('owner'); }
  get symbol() { return this.contractForm.get('symbol'); }
  get total_supply() { return this.contractForm.get('total_supply'); }
  get decimals() { return this.contractForm.get('decimals'); }
  get gas() { return this.contractForm.get('gas'); }
  get gasPrice() { return this.contractForm.get('gasPrice'); }
  get abi() { return this.contractForm.get('abi'); }
  ngOnInit() {
    this.contractForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      owner: new FormControl('', [Validators.required]),
      symbol: new FormControl('', [Validators.required]),
      gas: new FormControl('', [Validators.required]),
      gasPrice: new FormControl('', [Validators.required]),
      decimals: new FormControl('', [Validators.required]),
      total_supply: new FormControl('', [Validators.required]),
      abi: new FormControl('', [Validators.required])
    });
    this.getContracts();
  }
  getContracts() {
    this.cService.getContracts().subscribe((res) => {
      if (res.status === 'success') {
        this.contracts = res.body.contract;
        M.toast({ html: res.message });
      }
    });
  }
  addContract() {
    if (!this.contractForm.valid) { return; }
    const contract = Object.assign({}, this.contractForm.value);
    this.cService.addContracts(contract).subscribe((res) => {
      if (res.status === 'success') {
        this.contracts.push(res.body.contract);
        M.toast({ html: res.message });
        this.contractForm.reset();
      }
    });
  }
  removeContract(id, index) {
    this.cService.removeContract(id).subscribe((res) => {
      if (res.status === 'success') {
        this.contracts.splice(index, 1);
        M.toast({ html: res.message });
      }
    });
  }
  viewContract(item) {
    this.contract = item;
    this.updateContractForm = true;
  }
  updateContract() {
    if (!this.contractForm.valid) { return; }
    const contract = Object.assign({}, this.contractForm.value);
    this.cService.updateContract(this.contract._id, contract).subscribe((res) => {
      if (res.status === 'success') {
        this.updateContractForm = false;
        this.contract = {};
        M.toast({ html: res.message });
        this.contractForm.reset();
      }
    });
  }

}
