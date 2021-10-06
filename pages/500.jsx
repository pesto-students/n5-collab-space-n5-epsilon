import Image from "next/image";

export default function Custom500() {
  return (
    <>
      <div className="errorPage">
        <div className="error-image">
          <Image src="/Errorbugcat.gif" alt="here" height="200" width="200"></Image>
        </div>
        <div className="error-text">
          <h1>Oops Something Bad Happen</h1>
        </div>
      </div>
    </>
  );
}
