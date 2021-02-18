import { Component, OnInit } from '@angular/core';
import { Sport } from '../../../../models/sport.model';
import { ConfigurationLinesService } from '../../../../services/configuration-lines.service';
import { TreeviewItem } from 'ngx-treeview';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  selectedOption = 'v';
  selectedOP = 'a';

  config = {
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 500,
  };

  sportsAsTree: Sport[];
  items: TreeviewItem[] = [];

  constructor(private configService: ConfigurationLinesService) { }

  ngOnInit(): void {
    this.configService.getSportsAsTree().subscribe(res => {
      this.sportsAsTree = res;
      this.formatSportsIntoTree(this.sportsAsTree);
    });
  }

  onSelectedChange(selectedTitles: string[]): void {
    console.log(this.items);
    this.updateSelectedItems(selectedTitles);
  }

  updateSelectedItems($event) {
  }

  getSelectedItems(): TreeviewItem[]  {
    return this.items.filter(x => x.checked);
  }

  
  getSelectedChild(treeviewItem: TreeviewItem): TreeviewItem[]  {
    return treeviewItem.children.filter(x => x.checked);
  }



  formatSportsIntoTree(sports: Sport[]) {
    if (sports) {
      sports.forEach(sport => {
        const sportTreeChildren = [];
        sport.divisions.forEach(function (division) {
          const divisionTreeChildren = [];
          division.titles.forEach(function (title) {
            const titleTree = new TreeviewItem({
              text: title.name,
              value: title.name,
              checked: false,
              collapsed: true,
            });
            divisionTreeChildren.push(titleTree);
          }, this);
          const divisionTree = new TreeviewItem({
            text: division.name,
            value: division.name,
            checked: false,
            collapsed: true,
            children: divisionTreeChildren
          });
          sportTreeChildren.push(divisionTree);
        }, this);
        const sportTree = new TreeviewItem({
          text: sport.name,
          value: sport.name,
          checked: false,
          collapsed: true,
          children: sportTreeChildren
        });
        this.items.push(sportTree);
      });
    }
  }

}
