
import { getServerSession } from 'next-auth';
import ThreeSceneNebulosa from './components/ThreeSceneNebulosa';
import Login from './ui/login';
import { redirect } from 'next/navigation';

export default async function Registro(){

  const session = await getServerSession();
  // const session = await getServerSession();
  console.log(session)

  if (session) {
      redirect('/principal');
  }

  return (
    <div>
      <main>
        <Login />
        <ThreeSceneNebulosa />
      </main>
    </div>
  );
}

