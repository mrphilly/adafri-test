import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
let ListCampaignComponent = class ListCampaignComponent {
    constructor() {
        this.options = {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
        };
        this.displayedColumns = ['id', 'name', 'progress', 'color'];
        // Create 100 users
        const users = [];
        var users1 = [];
        for (let i = 1; i <= 100; i++) { /*users.push(createNewUser(i));*/
            users1.push({ "cnt": i, "name": "batr" + i });
        }
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(users1);
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    ngOnInit() {
        // this._service.success('nat','dndnnd',this.options);
    }
    applyFilter(filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
    addbut() {
        window.alert("addbutton");
    }
    editbut() {
        window.alert("editbutton");
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: false })
], ListCampaignComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: false })
], ListCampaignComponent.prototype, "sort", void 0);
ListCampaignComponent = tslib_1.__decorate([
    Component({
        selector: 'app-list-campaign',
        templateUrl: './list-campaign.component.html',
        styleUrls: ['./list-campaign.component.scss']
    })
], ListCampaignComponent);
export { ListCampaignComponent };
/** Builds and returns a new User. */
function createNewUser(id) {
    const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
    return {
        id: id.toString(),
        name: name,
        progress: Math.round(Math.random() * 100).toString(),
        color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
}
/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
    'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
//# sourceMappingURL=list-campaign.component.js.map