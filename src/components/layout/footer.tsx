import Link from 'next/link';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

const offices = [
    { city: 'Kinshasa', address: '123 Avenue de la Révolution, Gombe, Kinshasa, RDC' },
    { city: 'Lubumbashi', address: '456 Avenue Lumumba, Centre-ville, Lubumbashi, RDC' },
    { city: 'Kolwezi', address: '789 Boulevard de l\'Indépendance, Dilala, Kolwezi, RDC' },
];

export default function Footer() {
    return (
        <footer className="bg-card border-t border-border/50">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-bold font-headline text-primary">AGUST</h3>
                        <p className="mt-2 text-sm text-muted-foreground">L’expertise au service de vos ambitions.</p>
                        <div className="mt-4 flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={20} /></Link>
                        </div>
                    </div>
                    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {offices.map((office) => (
                            <div key={office.city}>
                                <h4 className="font-semibold text-foreground">{office.city}</h4>
                                <p className="mt-2 text-sm text-muted-foreground">{office.address}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-8 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} AGUST COMPANY AGENCY. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}
