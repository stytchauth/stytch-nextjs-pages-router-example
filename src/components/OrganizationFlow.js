import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Login from "src/components/Login";

const ContinueToTenantForm = () => {
  const [slug, setSlug] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    router.push(`${slug}/login`);
  };

  return (
    <div>
      <h1>What is your Organization&apos;s Domain?</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="acme-corp"
        />
        <button className="primary" id="button" type="submit" disabled={!slug}>
          Continue
        </button>
      </form>
    </div>
  );
};

const LoginOrganizationForm = () => {
    return (
      <ContinueToTenantForm />
    );
};

export default LoginOrganizationForm;