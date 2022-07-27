import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Frontend Mentor | Manage landing page';
  public email: string = '';
  public vaildation: boolean = false;
  public show = new BehaviorSubject(false);
  ngOnInit() {
		this.show.subscribe(() => {
      if (this.show.getValue()) {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      } else {
        document.getElementsByTagName('body')[0].style.overflow = '';
      }
		})
	}
  ngAfterViewInit() {
    var index = 1;
    window.addEventListener("resize", () => {
      var container = document.getElementsByClassName("quotes__container")[0] as HTMLElement;
      container.style.transform = 'translateX(' + (index * (-container.getBoundingClientRect().width)) + 'px)';
    });
    setInterval(() => {
      var controls = document.getElementsByClassName("control") as HTMLCollectionOf<HTMLElement>;
      var container = document.getElementsByClassName("quotes__container")[0] as HTMLElement;
      container.style.transform = 'translateX(' + (index * (-container.getBoundingClientRect().width) - container.getBoundingClientRect().width) + 'px)';
      container.style.transition = '';
      index++;
      for (let i = 0; i < controls.length; i++) {
        if (controls[i].classList.contains('_active')) {
          controls[i].classList.remove("_active");
          if (i+1 < controls.length) {
            controls[i+1].classList.add("_active");
          } else {
            controls[0].classList.add("_active");
          }
          break
        }
      }
      if (index == 5) {
        index = 1;
        setTimeout(() => {
          container.style.transform = 'translateX(' + (-container.getBoundingClientRect().width) + 'px)';
          container.style.transition = 'all 0s linear';
        }, 600);
      }
    }, 5000);
  }
  emailValidation() {
    var validator = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return this.vaildation = !validator.test(this.email);
  }
}
