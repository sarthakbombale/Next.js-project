
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
            {/* 1. Logo Section */}
            <div className="text-xl font-bold text-blue-600">
                <Link href="/">Sarthak.dev</Link>
            </div>

            {/* 2. Links Section */}
            <ul className="flex gap-6 list-none">
                <li>
                    <Link href="/home" className="hover:text-blue-500 transition-colors">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="hover:text-blue-500 transition-colors">
                        About
                    </Link>
                </li>
                <li>
                    <Link href="/projects" className="hover:text-blue-500 transition-colors">
                        Projects
                    </Link>
                </li>
                <li>
                    <Link href="/contact" className="hover:text-blue-500 transition-colors">
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;