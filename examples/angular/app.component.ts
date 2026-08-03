/**
 * vkeyboardhand × Angular
 * 在 Angular 组件中通过 ViewChild 获取容器，并在生命周期中创建/销毁实例。
 *
 * 使用前提：
 *  1. 安装：npm install vkeyboardhand
 *  2. 在 angular.json 的 styles 中加入 node_modules/vkeyboardhand/dist/vkeyboardhand.css
 *     （或在本组件 styleUrls 中引用）
 *  3. svg/keyboard.svg、svg/hand.svg 放在 src/assets/svg/ 下（Angular 会按 assets 配置拷贝）
 */
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import VKeyboardHand from 'vkeyboardhand';

@Component({
  selector: 'app-finger-teaching',
  template: `<div #host></div>`,
  styles: [`
    :host { display: block; max-width: 780px; margin: 0 auto; }
  `]
})
export class FingerTeachingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;

  private kb: VKeyboardHand | null = null;

  ngAfterViewInit(): void {
    this.kb = VKeyboardHand.create(this.host.nativeElement, {
      keyboard: 'assets/svg/keyboard.svg',
      hand: 'assets/svg/hand.svg',
      theme: 'bone',
      onKeyDown: (info) => console.log('按下', info)
    });
  }

  ngOnDestroy(): void {
    if (this.kb) this.kb.destroy();
  }
}
