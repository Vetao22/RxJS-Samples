import { Component, OnInit } from '@angular/core';
import { RxjsFunctionsStore } from '../Model/RxjsFuntionsStore';
import { RxjsFunction } from '../Model/RxjsFunction';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-functions-page',
  templateUrl: './functions-page.component.html',
  styleUrls: ['./functions-page.component.css']
})
export class FunctionsPageComponent implements OnInit
{
  rxjsFunctions: Array<RxjsFunction>;

  constructor(private rxjsStore: RxjsFunctionsStore, private route: ActivatedRoute)
  {

  }

  ngOnInit(): void
  {

    this.route.paramMap.subscribe(params =>
      {
        let funcType = params.get('type');
        const possibleFuncTypes = ['Combination', 'Conditional', 'Creation', 'ErrorHandling', 'Multicasting',
                  'Filtering', 'Utility'];

        if(!possibleFuncTypes.includes(funcType))
        {
            funcType = possibleFuncTypes[0];
        }

        this.rxjsFunctions = this.rxjsStore.functions.filter(f => f.funcType == funcType);

      });



    console.log(this.rxjsFunctions);
  }

  ngOnLoad(): void
  {

  }
}
