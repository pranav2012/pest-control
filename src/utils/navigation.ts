import { useRouter } from 'next/navigation';

export const handleSectionNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string,
    closeMenu?: () => void
) => {
    e.preventDefault();

    // Extract the section ID from the link
    const sectionId = link.replace('/#', '');

    // If we're on the home page
    if (window.location.pathname === '/') {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            const headerOffset = 96; // Adjust this value based on your header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    } else {
        // If we're not on the home page, navigate to home page with the section ID
        window.location.href = `/#${sectionId}`;
    }

    // Close mobile menu if provided
    if (closeMenu) {
        closeMenu();
    }
}; 