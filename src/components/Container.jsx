const Container = ({ children }) => {
  return (
    <>
      <main>
        <div className="container mx-auto max-w-5xl">{children}</div>
      </main>
    </>
  );
};

export default Container;