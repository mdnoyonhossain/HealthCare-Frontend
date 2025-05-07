import { Box, Button, Input, Typography } from '@mui/material';
import Image from 'next/image';
import linkedinIcon from "@/assets/landing_page/linkedin.png"
import twitterIcon from "@/assets/landing_page/twitter.png"
import facebookIcon from "@/assets/landing_page/facebook.png"
import instagramIcon from "@/assets/landing_page/instagram.png"
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-300 py-16 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        <Typography component={Link} href="/" variant="h4" fontWeight={600}><Box component="span" color="primary.main">H</Box>ealth<Box component="span" color="primary.main">C</Box>are</Typography>
                    </h2>
                    <p className="text-sm leading-relaxed">
                        Excellence in healthcare service with modern facilities and dedicated professionals.
                    </p>
                    <div className="flex space-x-4 mt-4 text-white">
                        <Link href="https://noyonhossain.vercel.app"><Image src={linkedinIcon} className="hover:text-pink-500" width={27} height={27} alt='linkedin' /></Link>
                        <Link href="https://noyonhossain.vercel.app"><Image src={twitterIcon} className="hover:text-pink-500" width={27} height={27} alt='twitter' /></Link>
                        <Link href="https://noyonhossain.vercel.app"><Image src={facebookIcon} className="hover:text-pink-500" width={27} height={27} alt='facebook' /></Link>
                        <Link href="https://noyonhossain.vercel.app"><Image src={instagramIcon} className="hover:text-pink-500" width={27} height={27} alt='instagram' /></Link>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        {['Home', 'Services', 'Doctors', 'Testimonials', 'Contact'].map((item) => (
                            <li key={item}>
                                <a href={`#${item.toLowerCase()}`} className="hover:text-white transition">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
                    <ul className="text-sm space-y-2">
                        <li>📍 2100 Main Street, Los Angeles, CA 90015</li>
                        <li>📞 +1 (123) 456-7890</li>
                        <li>✉️ contact@healthcare.com</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
                    <p className="text-sm mb-4">Subscribe to get our latest health tips & updates.</p>
                    <form className="flex flex-col sm:flex-row gap-3">
                        <Input
                            placeholder="Email address"
                            className="bg-white rounded-md px-3 text-sm"
                            disableUnderline
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ textTransform: 'none', borderRadius: '6px', px: 3 }}
                        >
                            Subscribe
                        </Button>
                    </form>
                </div>
            </div>

            <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
                <p>© {new Date().getFullYear()} HealthCare. All rights reserved.</p>
                <p className="mt-1">
                    Developed by{' '}
                    <Link
                        href="https://noyonhossain.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-medium hover:underline"
                    >
                        Noyon Hossain
                    </Link>
                </p>
            </div>

        </footer>
    );
};

export default Footer;
