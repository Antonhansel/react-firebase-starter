import { Spin } from 'antd';
import { useUser } from '../helpers/helpers';

export default function Dashboard() {
  const { user, isLoading: loading } = useUser();

  return (
    <div id={'dashboard'}>
      {loading && <Spin />}
      {!loading && user?.id}
    </div>
  );
}
