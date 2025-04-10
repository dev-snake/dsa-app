interface HomePageProps {
    foo: string;
}

const HomePage = (props: HomePageProps) => (
    <div className="home-page-component">
        <h1>Home</h1>
    </div>
);

HomePage.defaultProps = {
    foo: 'bar',
};

export default HomePage;
