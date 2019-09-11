import { Component, OnInit } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';
import { NgxHmCarouselBreakPointUp } from 'ngx-hm-carousel';
import { Observable } from 'rxjs';
import { PrimeCutsService } from '../services/prime-cuts.service';

@Component({
  selector: 'app-prime-cuts',
  templateUrl: './prime-cuts.component.html',
  styleUrls: ['./prime-cuts.component.scss']
})
export class PrimeCutsComponent implements OnInit {
  carouselInfinite: boolean = true;
  carouselIndex: number = 0;
  carouselBreakpoints: NgxHmCarouselBreakPointUp[] = [
    {
      width: 500,
      number: 1
    },
    {
      width: 800,
      number: 2
    },
    {
      width: 1024,
      number: 3
    }
  ];
  carouselData: any[];
  viewingStudio: any;

  primePosts$: Observable<any[]>;
  featureFriday$: Observable<any>;
  featured$: Observable<any[]>;

  masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.2s',
    gutter: 20,
    resize: true,
    initLayout: true,
    fitWidth: true
  };

  constructor(private primeService: PrimeCutsService) { }

  layoutComplete(event: any) {
    // console.log('layoutComplete', event);
  }

  onScroll() {
    console.log('onScroll');
    this.primeService.getMorePrimeCuts();
  }

  ngOnInit() {
    this.carouselData = [
      {
        title: 'Alexis Nutini',
        thumbnail: 'assets/images/alexis-nutini-thumbnail.jpg',
        videoUrl: 'https://www.youtube.com/embed/ao2bFVcdUJ8',
        primePostId: 'Lo5fXc8Bsihz9LnJzamF'
      },
      {
        title: 'Phil McGaughy',
        thumbnail: 'assets/images/phil-mcgaughy-thumbnail.jpg',
        videoUrl: 'https://www.youtube.com/embed/plziHxS7r-4',
        primePostId: 'EoHD7zlIwOs9XnxjgLeS'
      },
      {
        title: 'Lindsay Keating',
        thumbnail: 'assets/images/lindsey-keating-thumbnail.jpg',
        videoUrl: 'https://www.youtube.com/embed/tOXZ4rWu5go',
        primePostId: 'oVoyrYxW3dilZq9zo7SR'
      }
    ];

    document.querySelector('.main-container').scrollTop = 0;

    this.featureFriday$ = this.primeService.featureFriday$.asObservable();

    this.primePosts$ = this.primeService.primePosts$.asObservable();

    this.featured$ = this.primeService.featuredFour$.asObservable();
  }

  click(i: number) {
    if (this.carouselIndex !== i) {
      this.carouselIndex = i;
    }
    this.viewingStudio = this.carouselData[i];
  }

  toggleViewer(showAll: boolean) {
    if (showAll) {
      this.viewingStudio = null;
    }
  }

}
