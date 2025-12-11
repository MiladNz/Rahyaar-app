import Image from "next/image";
import aira_m from "@/assets/images/aira_m.svg";
import aira_d from "@/assets/images/aira_d.svg";
import ecunion_m from "@/assets/images/ecunion_m.svg";
import ecunion_d from "@/assets/images/ecunion_d.svg";
import passengerright_m from "@/assets/images/passengerright_m.svg";
import passengerright_d from "@/assets/images/passengerright_d.svg";
import samandehi_m from "@/assets/images/samandehi_m.svg";
import samandehi_d from "@/assets/images/samandehi_d.svg";
import stateairline_m from "@/assets/images/stateairline_m.svg";
import stateairline_d from "@/assets/images/stateairline_d.svg";
import rahyaarLogo from "@/assets/images/rahyaar.png";

function Footer() {
  return (
    <>
      <div className="block lg:hidden border-t-2 pt-4 dark:border-gray-700">
        <div className="flex items-center justify-between p-4 text-[#282828] dark:text-white">
          <div>
            <h3 className="text-xl font-semibold mb-5">رهیار</h3>
            <ul className="text-base leading-8 cursor-pointer">
              <li className="hover:text-complementry transition-colors">
                درباره ما
              </li>
              <li className="hover:text-complementry transition-colors">
                تماس با ما
              </li>
              <li className="hover:text-complementry transition-colors">
                چرا رهیار
              </li>
              <li className="hover:text-complementry transition-colors">
                بیمه مسافرتی
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-5">خدمات مشتریان</h3>
            <ul className="text-base leading-8 cursor-pointer">
              <li className="hover:text-complementry transition-colors">
                پشتیبانی آنلاین
              </li>
              <li className="hover:text-complementry transition-colors">
                راهنمای خرید
              </li>
              <li className="hover:text-complementry transition-colors">
                راهنمای استرداد
              </li>
              <li className="hover:text-complementry transition-colors">
                پرسش و پاسخ
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center p-4">
          <div className="grid grid-cols-[repeat(3,minmax(0,50px))] gap-x-1 gap-y-4 ">
            <Image
              src={ecunion_m}
              alt="ecunion logo"
              width={35}
              height={38}
              priority={false}
              loading="lazy"
              className="dark:shadow-lg"
              style={{
                filter: "drop-shadow(rgba(255, 255, 255, 0.9) 0px 0px 0px)",
              }}
            />
            <Image
              src={samandehi_m}
              alt="samandehi logo"
              width={34}
              height={38}
              priority={false}
              loading="lazy"
              className="dark:shadow-lg"
              style={{
                filter: "drop-shadow(rgba(255, 255, 255, 0.9) 0px 0px 0px)",
              }}
            />
            <Image
              src={aira_m}
              alt="aira logo"
              width={35}
              height={38}
              priority={false}
              loading="lazy"
              className="dark:shadow-lg"
              style={{
                filter: "drop-shadow(rgba(255, 255, 255, 0.9) 0px 0px 0px)",
              }}
            />
            <Image
              src={stateairline_m}
              alt="stateairline logo"
              width={40}
              height={38}
              priority={false}
              loading="lazy"
              className="dark:shadow-lg"
              style={{
                filter: "drop-shadow(rgba(255, 255, 255, 0.9) 0px 0px 0px)",
              }}
            />
            <Image
              src={passengerright_m}
              alt="passengerright logo"
              width={36}
              height={38}
              priority={false}
              loading="lazy"
              className="dark:shadow-lg"
              style={{
                filter: "drop-shadow(rgba(255, 255, 255, 0.9) 0px 0px 0px)",
              }}
            />
          </div>
          <div className="flex flex-col items-end gap-y-3 dark:[filter:drop-shadow(0px_1px_4px_rgba(255,255,255,0.3))]">
            <Image
              src={rahyaarLogo}
              alt="rahyaar logo"
              width={100}
              height={30}
              priority={false}
              loading="lazy"
              className="dark:invert dark:brightness-0 dark:hue-rotate-90"
            />
            <p className="text-sm font-semibold text-nowrap dark:text-white">
              تلفن پشتیبانی : ۸۵۷۴-۰۲۱
            </p>
          </div>
        </div>
        <div className="border-t-2 dark:border-gray-700 flex justify-center items-center p-4 ">
          <p className="text-sm text-[#282828] dark:text-gray-300">
            © کلیه حقوق این وبسایت متعلق به رهیار میباشد.
          </p>
        </div>
      </div>
      <div className="hidden xl:max-w-screen-xl mx-auto lg:grid grid-cols-2 grid-rows-[auto_auto_auto] px-32 border-t-2 pt-4 dark:border-gray-700">
        <div className="flex items-center justify-start gap-x-24 px-4 py-1 text-[#282828] dark:text-white">
          <div>
            <h3 className="text-2xl font-semibold mb-5">رهیار</h3>
            <ul className="text-lg leading-8 cursor-pointer">
              <li className="hover:text-complementry transition-colors">
                درباره ما
              </li>
              <li className="hover:text-complementry transition-colors">
                تماس با ما
              </li>
              <li className="hover:text-complementry transition-colors">
                چرا رهیار
              </li>
              <li className="hover:text-complementry transition-colors">
                بیمه مسافرتی
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-5">خدمات مشتریان</h3>
            <ul className="text-lg leading-8 cursor-pointer">
              <li className="hover:text-complementry transition-colors">
                پشتیبانی آنلاین
              </li>
              <li className="hover:text-complementry transition-colors">
                راهنمای خرید
              </li>
              <li className="hover:text-complementry transition-colors">
                راهنمای استرداد
              </li>
              <li className="hover:text-complementry transition-colors">
                پرسش و پاسخ
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="flex-col justify-center items-center px-4 py-1">
            <div className="flex flex-col items-end gap-y-3 mb-4 dark:[filter:drop-shadow(0px_1px_4px_rgba(255,255,255,0.3))]">
              <Image
                src={rahyaarLogo}
                alt="rahyaar logo"
                width={146}
                height={44}
                priority={false}
                loading="lazy"
                className="dark:invert dark:brightness-0 dark:hue-rotate-90"
              />
              <p className="text-sm font-semibold text-nowrap dark:text-white">
                تلفن پشتیبانی : ۸۵۷۴-۰۲۱
              </p>
            </div>
            <div className="flex justify-end lg:gap-x-1 xl:gap-x-4">
              <Image
                src={ecunion_d}
                alt="ecunion logo"
                width={68}
                height={74}
                priority={false}
                loading="lazy"
                className="dark:shadow-lg"
                style={{
                  filter: "drop-shadow(rgba(255, 255, 255, 0.9) 0px 0px 0px)",
                }}
              />
              <Image
                src={samandehi_d}
                alt="samandehi logo"
                width={67}
                height={74}
                priority={false}
                loading="lazy"
                className="dark:shadow-lg"
                style={{
                  filter: "drop-shadow(rgba(255, 255, 255, 0.9) 0px 0px 0px)",
                }}
              />
              <Image
                src={aira_d}
                alt="aira logo"
                width={68}
                height={74}
                priority={false}
                loading="lazy"
                className="dark:shadow-lg"
                style={{
                  filter: "drop-shadow(rgba(255, 255, 255, 0.9) 0px 0px 0px)",
                }}
              />
              <Image
                src={stateairline_d}
                alt="stateairline logo"
                width={78}
                height={74}
                priority={false}
                loading="lazy"
                className="dark:shadow-lg"
                style={{
                  filter: "drop-shadow(rgba(255, 255, 255, 0.9) 0px 0px 0px)",
                }}
              />
              <Image
                src={passengerright_d}
                alt="passengerright logo"
                width={71}
                height={74}
                priority={false}
                loading="lazy"
                className="dark:shadow-lg"
                style={{
                  filter: "drop-shadow(rgba(255, 255, 255, 0.9) 0px 0px 0px)",
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 border-t-2 dark:border-gray-700 flex justify-center items-center p-4">
          <p className="text-sm text-[#282828] dark:text-gray-300">
            Developed By MiladNz © All rights reserved 2025
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
