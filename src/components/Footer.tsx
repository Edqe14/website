import { ReactElement, useState } from 'react';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faDiscord,
  faNpm,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Contact } from '@/database/Types';
import buildURL from '@/utils/buildURL';

import Style from '@styles/footer.module.scss';
import Input from './Input';

const icons = {
  github: faGithub,
  discord: faDiscord,
  npm: faNpm,
  twitter: faTwitter,
};

//                      Default       Sending    Success     Failed
const statusColors = ['transparent', '#dbb623', '#24ce1e', '#ce1e1e'];

export default function Footer({
  publicEmail,
  socialMedias,
}: Contact): ReactElement {
  const [status, setStatus] = useState(0);
  let lock = false;

  const sendForm = async () => {
    if (lock) return;

    lock = true;
    setStatus(1);

    try {
      const name = document.getElementById('name') as HTMLInputElement;
      const email = document.getElementById('email') as HTMLInputElement;
      const message = document.getElementById('message') as HTMLInputElement;

      const res = await fetch(buildURL('/api/form'), {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          message: message.value,
        }),
      });

      if (res.status !== 200) {
        setStatus(3);
        res.json().then(console.error);
      } else setStatus(2);

      setTimeout(() => setStatus(0), 5000);
      [name, email, message].forEach((e) => (e.value = ''));
      lock = false;
    } catch (e) {
      console.error(e);
      setStatus(3);
    }
  };

  return (
    <section className={Style.container} id='contact'>
      <div className={Style.content}>
        <div className={`${Style.section} scrollEffect`}>
          <div>
            <div className={Style.header}>
              <h4>Contact —</h4>
              <p>Me</p>
            </div>

            <div className={Style.emailColumn}>
              <h3 className={Style.fieldTitle}>Email</h3>
              <p
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = `mailto:${publicEmail}`;
                  a.rel = 'noopener noreferrer nofollow';
                  a.target = '_blank';
                  a.click();
                }}
              >
                {publicEmail}
              </p>
            </div>

            <div className={Style.socialMedias}>
              <h3 className={Style.fieldTitle}>On the Web</h3>
              <ul>
                {(socialMedias ?? []).map((t, i) =>
                  icons[t.icon] ? (
                    <FontAwesomeIcon
                      className={Style.socialMedia}
                      icon={icons[t.icon]}
                      key={i}
                      onClick={() => {
                        const a = document.createElement('a');
                        a.href = t.url;
                        a.rel = 'noopener noreferrer nofollow';
                        a.target = '_blank';
                        a.click();
                      }}
                    />
                  ) : null
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className={`${Style.section} scrollEffect`}>
          <div>
            <div className={Style.header}>
              <h4 style={{ color: 'transparent' }}>—</h4>
              <p>Form</p>
            </div>

            <form
              className={Style.form}
              onSubmit={(e) => {
                e.preventDefault();
                sendForm();
              }}
            >
              <div className={Style.inputs}>
                <div className={Style.head}>
                  <Input
                    type='text'
                    placeholder='Name'
                    name='name'
                    maxLength={50}
                    key='name'
                    id='name'
                    required
                  />
                  <Input
                    type='email'
                    placeholder='Email'
                    name='email'
                    key='email'
                    id='email'
                    pattern='^[a-zA-Z0-9._%+-]+@(?!example.com)[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$'
                    required
                  />
                </div>

                <textarea
                  placeholder='Message'
                  name='message'
                  minLength={3}
                  maxLength={256}
                  key='message'
                  id='message'
                  className={Style.message}
                  required
                />
              </div>

              <button
                className={Style.send}
                style={{
                  background: statusColors[status],
                  cursor: status === 1 ? 'progress' : 'pointer',
                }}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className={Style.footer}>
        <p className={Style.copyright}>
          &copy; 2021 Joshua Tanri. All rights reserved.
        </p>

        <div
          className={Style.goUpWrapper}
          onClick={() => {
            const a = document.createElement('a');
            a.href = '#';
            a.click();
          }}
        >
          <FontAwesomeIcon className={Style.goUp} icon={faChevronUp} />
        </div>
      </div>
    </section>
  );
}
