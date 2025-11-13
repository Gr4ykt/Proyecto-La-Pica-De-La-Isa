import LoginHero from "../components/LoginHero";

function LoginRegisterPage() {
  return (
    <div 
      className="transition-colors duration-300 flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <LoginHero />
    </div>
  );
}

export default LoginRegisterPage;