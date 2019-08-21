import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../services/user.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  categories = [
    'Sculpture',
    'Design',
    'Illustration',
    'Photography',
    'Painting',
    'Video',
    'Typography',
    'Animation',
    'Mixed Media',
    'Ceramics',
    'Metal Work',
    'Glass'
  ];

  users$;

  selectedCategories: any[];
  searchTerm: string;
  membership: string;
  radioSelection: string = null;

  constructor(public userService: UserService, private ren: Renderer2) { }

  ngOnInit() {
    this.filterUsers();
  }

  filterUsers() {
    this.users$ = this.userService.users$.pipe(
      switchMap(users => {
        if (!this.searchTerm && (!this.selectedCategories || !this.selectedCategories.length)) {
          return of(users);
        }

        const filtered = users.filter(user => {
          let validCategory: boolean;

          if (this.selectedCategories && this.selectedCategories.length) {
            validCategory = this.selectedCategories.some(c => {
              return user.medium && c.toLowerCase() === user.medium.toLowerCase();
            });
          } else {
            validCategory = true;
          }

          const re = new RegExp(this.searchTerm);

          const validSearch = this.searchTerm ? re.test(user.username) : true;

          return validCategory && validSearch;
        });

        return of(filtered);
      })
    );
  }

  radioClick(el) {
    setTimeout(() => {
      if (this.radioSelection === el.value) {
        el.checked = false;
        this.ren.removeClass(el._elementRef.nativeElement, 'cdk-focused');
        this.ren.removeClass(el._elementRef.nativeElement, 'cdk-program-focused');
        this.radioSelection = null;
        this.membership = null;
      } else {
        this.radioSelection = el.value;
      }
    });
  }

  change() {
    this.filterUsers();
  }

  follow(member: any) {
    console.log('follow', member);
  }

}