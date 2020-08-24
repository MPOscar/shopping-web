import { Component, OnInit } from '@angular/core';
//
import * as moment from 'moment';
//
import { BlogsService } from '../../../ms-blogs/services/blogs.service';


@Component({
  selector: 'ms-latest-news',
  templateUrl: './ms-latest-news.component.html',
  styleUrls: ['./ms-latest-news.component.scss']
})
export class MsLatestNewsComponent implements OnInit {
  public latestNews: Array<any> = [];

  constructor(public blogsService: BlogsService) { }

  ngOnInit() {
    this.blogsService.getLattestNewBlogs().subscribe(response => {
      response.data.forEach(element => {
        this.latestNews.push({
          title: element.title,
          date: moment(element.createdAt).format('MMMM Do, YYYY') + ' by ' + element.author,
          resume: element.body,
          image: element.imgUrl,
          link: '#'
        });

      });
    });
    /*this.latestNews.push({
      title: 'Nike Air Force 1 "Just Do It"',
      date: '08/10/2018 by Michael Douglas',
      resume: 'I would have never though these big boys would be on sale for Christmas. Everyone is...',
      image: 'assets/images/moc-images/latest-news/2.png',
      link: '#'
    });

    this.latestNews.push({
      title: 'Miadidas Ultra Boost "Rainbow"',
      date: '05/10/2018 by Michael Douglas',
      resume: 'In a sneaker market were limited releases are very appreciated by the fans, the...',
      image: 'assets/images/moc-images/latest-news/1.png',
      link: '#'
    });

    this.latestNews.push({
      title: 'Air Jordan 3 Retro OG "Black Cement"',
      date: '24/09/2018 by Michael Douglas',
      resume: 'Very anticipated release by any Jordan Brand collector, ' +
        'the Air Jordan 3 Retro "Black Cement" is coming back on...',
      image: 'assets/images/moc-images/latest-news/3.png',
      link: '#'
    });*/
  }

}
