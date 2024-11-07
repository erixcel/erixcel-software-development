import { afterNextRender, ChangeDetectorRef, Component } from '@angular/core'

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  isVisibleNav:boolean = false
  isScreenPhone:boolean = false
  offset = 70

  constructor(
    private cdr: ChangeDetectorRef
  ) {
    afterNextRender(() => {
      this.isScreenPhone = window.innerWidth > 640 ? true : false
      this.offset = window.innerWidth > 640 ? 70 : 55
      this.cdr.detectChanges()
      window.addEventListener('resize', this.handleResize)
    })
  }

  goingTo(section:string): void {
    this.isVisibleNav = !this.isVisibleNav
    setTimeout(() => {
      const element = document.getElementById(section)
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - this.offset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    },100)
  }

  private handleResize = (): void => {
    if (window.innerWidth > 640) {
      if(!this.isScreenPhone) {
        this.isScreenPhone = true
        this.offset = 70
        this.cdr.detectChanges()
      }
    } else {
      if(this.isScreenPhone) {
        this.isScreenPhone = false
        this.offset = 55
        this.cdr.detectChanges()
      }
    }
  }
}
