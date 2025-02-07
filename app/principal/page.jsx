
import { redirect } from 'next/navigation';
import ThreeScene from '../components/ThreeScene';
import { getServerSession } from 'next-auth';
import Button from '../ui/logout';
import SmsInvitation from '../components/smsInvitation';
import '../customCss/card.css';

export default async function Page() {
    const session = await getServerSession();
    // const session = await getServerSession();
    console.log(session)

    if (!session) {
        redirect('/');
    }

    return (
        <div>
            <main>
                <div className='absolute text-white text-2xl w-full h-full flex justify-center items-center p-9'>

                    <div className='card relative'>
                        <div className="circles"></div>
                        <div className="circles"></div>
                        <div className="card-inner px-4">
                            <div className='py-8 text-center'>
                                <h6 className='text-yellow-500' >Bienvenido {session.user.name}</h6>
                            </div>

                            <div className='text-center'>
                                <h6>Invitación para el cumpleaños de Rahamsis</h6>                                
                            </div>

                            <div className='pt-8 pb-2 text-center'>
                                <p className='text-base mt-4'>realiza: 08/06/2024 - 18:00</p>
                            </div>

                            <div className='py-8 text-center'>
                                <p className='text-base mt-4'>En el transcurso del día te llegará un mensaje al wtsp del numero con el que inicio sesión, junto con la dirección en donde se realizará el evento XD.</p>
                            </div>

                            <div className='flex justify-center py-9'>
                                <Button />
                            </div>
                        </div>
                    </div>
                    {/* <div className='relative'>
                        <div className='py-8 text-center'>
                            <h6 className='text-5xl text-yellow-500' >Bienvenido {session.user.name}</h6>
                        </div>
                        <div className='py-8 text-center'>
                            <h6>Invitación para el cumpleaños de Rahamsis</h6>
                            <p className='text-base mt-4'>En el transcurso del día te llegará un mensaje al wtsp del numero con el que inicio sesión, junto con la dirección en donde se realizará el evento XD.</p>
                        </div>
                        <div className='flex justify-center py-9'>
                            <Button />
                        </div>

                    </div> */}
                </div>
                <ThreeScene />
            </main>
        </div>
    );
}


