import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";

const FooterComp = () => {
    return (
        <Footer container className="bg-transparent! shadow-none! border-t border-white/10">
            <FooterCopyright href="#" by="Tracelo™" year={2026} />
            <FooterLinkGroup>
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Licensing</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
            </FooterLinkGroup>
        </Footer>
    );
};

export default FooterComp;
