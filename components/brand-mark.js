import Image from "next/image";

export function BrandMark({ compact = false }) {
  return (
    <div className="brand-mark" aria-label="A.R.E.N.A">
      <span className="brand-logo">
        <Image
          src="/logo.jpg"
          alt="A.R.E.N.A Logo"
          width={48}
          height={48}
          priority
        />
      </span>
      {!compact && (
        <span>
          <strong>ARENA</strong>
          <small>IIIT Bhopal</small>
        </span>
      )}
    </div>
  );
}
