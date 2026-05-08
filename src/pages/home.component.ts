import { Component, OnInit, OnDestroy, signal, HostListener, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('featRef') featRef!: ElementRef;
  @ViewChild('ctaRef') ctaRef!: ElementRef;

  // State management with Signals
  isDark = signal(true);
  scrollY = signal(0);
  email = signal('');
  submitted = signal(false);
  
  // Intersection Observer states
  featInView = signal(false);
  ctaInView = signal(false);
  private observer!: IntersectionObserver;

  features = [
    { emoji: "🧾", title: "Pedidos em tempo real", desc: "Crie pedidos rapidamente, acompanhe o status e envie para a cozinha com um toque." },
    { emoji: "👨‍🍳", title: "Painel da Cozinha", desc: "Tela dedicada para a equipe de produção com timer por pedido e alertas visuais de atraso." },
    { emoji: "📦", title: "Controle de Estoque", desc: "Monitore ingredientes e embalagens com alertas de estoque mínimo antes que acabem." },
    { emoji: "📊", title: "Relatórios Financeiros", desc: "Faturamento, despesas e lucro em um painel claro. Saiba exatamente quanto ganhou." },
    { emoji: "🍫", title: "Cardápio Digital", desc: "Cadastre crepes, bebidas e sobremesas com foto, preço e custo de produção." },
    { emoji: "💳", title: "Múltiplos Pagamentos", desc: "Dinheiro, Pix ou cartão — registre cada forma e veja o breakdown no relatório." },
  ];

  navLinks = [
    { id: 'funcionalidades', label: 'Funcionalidades' },
    { id: 'precos', label: 'Preços' },
    { id: 'cadastro', label: 'Cadastro' }
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollY.set(window.scrollY);
  }

  toggleTheme() {
    this.isDark.update(v => !v);
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  handleSubmit() {
    if (this.email()) {
      this.submitted.set(true);
    }
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === this.featRef.nativeElement && entry.isIntersecting) {
          this.featInView.set(true);
        }
        if (entry.target === this.ctaRef.nativeElement && entry.isIntersecting) {
          this.ctaInView.set(true);
        }
      });
    }, { threshold: 0.15 });

    this.observer.observe(this.featRef.nativeElement);
    this.observer.observe(this.ctaRef.nativeElement);
  }
}