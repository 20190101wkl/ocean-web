import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { PowerPointService } from '../../../service/PowerPointService';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() source;

  pageNo = 1; // 页码
  pageIndex = 1;
  pageSize = 20; // 每页显示条数
  totalCount = 0; // 页面总数
  resourceList = []; // 资源数组
  resourceURL = 'http://123.56.128.130/ocean/images/'; // 缩略图地址
  classifications = [];
  templateType = "";

  pageList: any = [];
  /*展示模块的控制变量*/
  showNavMap: {[name: string]: boolean} = {
      showTemplate: true
      , showBackground: false
  };

  constructor(private router: Router,
              private http: HttpClient,
              private powerPointService: PowerPointService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // 查询模板数据信息
    this.route.queryParams.subscribe((data) => {
      this.source = data.source;
      this.getPPT(this.pageIndex, this.pageSize);
    });
    // 查询模板分类信息
    this.powerPointService.getClassifications().subscribe(
      (result: any) => {
        this.classifications = result;
      }
    );
  }

  menuSelected() {
    console.log('selected');
  }

  /*  */
  showHandler(nav: string) {
      for (const key in this.showNavMap) {
          if (key !== nav) {
              this.showNavMap[key] = false;
          } else {
              this.showNavMap[key] = true;
          }
      }
  }

  /*新页签展示详情页*/
  openDetailPage(powerpointId: string) {
    // 新标签页打开
    window.open('/detail?powerpointId=' + powerpointId);
    // 当前页跳转
    // this.router.navigateByUrl('/detail?powerpointId=' + powerpointId);
  }

  searchData(templateType: string) {
    this.powerPointService.getPPT(this.pageIndex, this.pageSize, this.templateType).subscribe(
      (result: any) => {
        this.pageList = result.content;
        this.totalCount = result.totalElements;
      }
    );
  }
}
