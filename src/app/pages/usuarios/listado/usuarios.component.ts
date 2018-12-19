
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
// import { tableData } from './tables-dynamic.data';
declare let jQuery: any;


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  public data = [
    {
      'id': '1',
      'name': 'Algerd',
      'paterno': 'Gonzales',
      'materno': 'Palo Alto',
      'rol': 'Usuario',
      'status': 'Activo'
    },
    {
      'id': '2',
      'name': 'Vitaut',
      'paterno': 'Pérez',
      'materno': 'Vilnia',
      'rol': 'Usuario',
      'status': 'Activo'
    },
    {
      'id': '3',
      'name': 'Honar',
      'paterno': 'Herrera',
      'materno': 'Berlin',
      'rol': 'Usuario',
      'status': 'Activo'
    },
    {
      'id': '4',
      'name': 'Jack',
      'paterno': 'Vargas',
      'materno': 'San Francisco',
      'rol': 'Usuario',
      'status': 'Bloqueado'
    },
    {
      'id': '5',
      'name': 'Leon',
      'paterno': 'Palomarez',
      'materno': 'Brasilia',
      'rol': 'Administrador',
      'status': 'Activo'
    },
    {
      'id': '6',
      'name': 'Max',
      'paterno': 'Báez',
      'materno': 'Helsinki',
      'rol': 'Usuario',
      'status': 'Baja'
    },
    {
      'id': '7',
      'name': 'Pol',
      'paterno': 'Arciga',
      'materno': 'Radashkovichi',
      'rol': 'Usuario',
      'status': 'Activo'
    },
    {
      'id': '8',
      'name': 'Chrishna',
      'paterno': 'López',
      'materno': 'Mumbai',
      'rol': 'Usuario',
      'status': 'Activo'
    },
    {
      'id': '9',
      'name': 'Leslie',
      'paterno': 'Urrutia',
      'materno': 'Singapore',
      'rol': 'Administrador',
      'status': 'Activo'
    },
    {
      'id': '10',
      'name': 'David',
      'paterno': 'Alvarado',
      'materno': 'Portland',
      'rol': 'Usuario',
      'status': 'Activo'
    },
    {
      'id': '11',
      'name': 'Andrej',
      'paterno': 'Meza',
      'materno': 'Minsk',
      'rol': 'Usuario',
      'status': 'Activo'
    },
    {
      'id': '12',
      'name': 'Julia',
      'paterno': 'Cisneros',
      'materno': 'Hrodna',
      'rol': 'Usuario',
      'status': 'Activo'
    },
    {
      'id': '13',
      'name': 'Ihnat',
      'paterno': 'Luna',
      'materno': 'Los Angeles',
      'rol': 'Usuario',
      'status': 'Activo'
    },
    {
      'id': '14',
      'name': 'Abraham',
      'paterno': 'Torres',
      'materno': 'Panama',
      'rol': 'Usuario',
      'status': 'Baja temporal'
    },
    {
      'id': '15',
      'name': 'Tomas',
      'paterno': 'Iglesias',
      'materno': 'Amsterdam',
      'rol': 'Usuario',
      'status': 'Activo'
    },
    {
      'id': '16',
      'name': 'Scott',
      'paterno': 'Nuñez',
      'materno': 'Sluck',
      'rol': 'Administrador',
      'status': 'Activo'
    },
    {
      'id': '17',
      'name': 'Pham',
      'paterno': 'Orozco',
      'materno': 'Tokyo',
      'rol': 'Usuario',
      'status': 'Activo'
    },
    {
      'id': '18',
      'name': 'Peter',
      'paterno': 'Sánchez',
      'materno': 'Cape Town',
      'rol': 'Administrador',
      'status': 'Activo'
    },
    {
      'id': '19',
      'name': 'Uladz',
      'paterno': 'Árciga',
      'materno': 'Mahileu',
      'rol': 'Usuario',
      'status': 'Activo'
    }
  ];
  searchText: string = '';

  rows: Array<any> = [];
  columns: Array<any> = [
    {title: 'Name', name: 'name'},
    {title: 'Position', name: 'position', sort: false},
    {title: 'Office', name: 'office', sort: 'asc'},
    {title: 'Extn.', name: 'ext', sort: ''},
    {title: 'Start rol', name: 'startrol'},
    {title: 'Salary ($)', name: 'salary'}
  ];
  page: number = 1;
  itemsPerPage: number = 10;
  maxSize: number = 5;
  numPages: number = 1;
  length: number = 0;

  config: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: '', columnName: 'position'}
  };

  // ng2TableData: Array<any> = tableData;
  constructor() { }


  ngOnInit(): void {
    const searchInput = jQuery('#table-search-input, #search-countries');
    searchInput
      .focus((e) => {
      jQuery(e.target).closest('.input-group').addClass('focus');
    })
      .focusout((e) => {
      jQuery(e.target).closest('.input-group').removeClass('focus');
    });
    this.onChangeTable(this.config);
  }


  changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  changeFilter(data: any, config: any): any {
    if (!config.filtering) {
      return data;
    }

    const filteredData: Array<any> = data.filter((item: any) =>
      item[config.filtering.columnName].match(this.config.filtering.filterString));

    return filteredData;
  }

  onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

  }

}



