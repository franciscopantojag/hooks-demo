import Layout from './Components/Layout';
import Gallery from './Components/Gallery';
import { useQueryImages } from './useBirdImages';
import LoadingSpinner from './Components/LoadingSpinner';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const MyApp = () => {
  const { isLoading, error, data } = useQueryImages();
  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }
  if (error || !data?.length) return <div>Error...</div>;

  return (
    <Layout>
      <Gallery images={data} />
    </Layout>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MyApp />
    </QueryClientProvider>
  );
};

export default App;
