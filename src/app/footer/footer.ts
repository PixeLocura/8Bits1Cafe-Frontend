import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface FooterColumn {
  title: string;
  links: { text: string; url: string }[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  description = 'Un lugar acogedor para descubrir juegos indie y conectar con desarrolladores con una taza de café virtual.';
  currentYear = new Date().getFullYear();

  footerColumns: FooterColumn[] = [
    {
      title: 'Plataforma',
      links: [
        { text: 'Descubre Juegos', url: '/games' },
        { text: 'Desarrolladores', url: '/developers' },
        { text: 'Dev Blog', url: '/blog' },
        { text: 'Sobre Nosotros', url: '/about' }
      ]
    },
    {
      title: 'Unete',
      links: [
        { text: 'Regístrate', url: '/register' },
        { text: 'Inicia Sesión', url: '/login' },
        { text: 'Sé un Desarrollador', url: '/become-developer' }
      ]
    },
    {
      title: 'Soporte',
      links: [
        { text: 'Centro de Ayuda', url: '/help' },
        { text: 'Contáctanos', url: '/contact' },
        { text: 'Términos del Servicio', url: '/terms' },
        { text: 'Política de Privacidad', url: '/privacy' }
      ]
    }
  ];
}
