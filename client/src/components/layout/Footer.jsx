function Footer() {
  return (
    <footer className=" bg-green-900 py-6">
      <div className="flex flex-row justify-center items-center container mx-auto text-white text-center">
        <p>
          &copy; 2025 Pizza Delight. Created with ♥ by{' '}
          <a
            // href="https://bento.me/itxsaaad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-400 underline underline-offset-4"
          >
            Zeel Sadariya
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
