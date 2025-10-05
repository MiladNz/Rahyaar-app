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
      <div className="block lg:hidden border-t-2 pt-4">
        <div className="flex items-center justify-between p-4 text-[#282828]">
          <div>
            <h3 className="text-xl font-semibold mb-5">تورینو</h3>
            <ul className="text-base leading-8 cursor-pointer">
              <li>درباره ما</li>
              <li>تماس با ما</li>
              <li>چرا تورینو</li>
              <li>بیمه مسافرتی</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-5">خدمات مشتریان</h3>
            <ul className="text-base leading-8 cursor-pointer">
              <li>پشتیبانی آنلاین</li>
              <li>راهنمای خرید</li>
              <li>راهنمای استرداد</li>
              <li>پرسش و پاسخ</li>
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
            />
            <Image
              src={samandehi_m}
              alt="samandehi logo"
              width={34}
              height={38}
              priority={false}
              loading="lazy"
            />
            <Image
              src={aira_m}
              alt="aira logo"
              width={35}
              height={38}
              priority={false}
              loading="lazy"
            />
            <Image
              src={stateairline_m}
              alt="stateairline logo"
              width={40}
              height={38}
              priority={false}
              loading="lazy"
            />
            <Image
              src={passengerright_m}
              alt="passengerright logo"
              width={36}
              height={38}
              priority={false}
              loading="lazy"
            />
          </div>
          <div className="flex flex-col items-end gap-y-3">
            <Image
              src={rahyaarLogo}
              alt="rahyaar logo"
              width={100}
              height={30}
              priority={false}
              loading="lazy"
            />
            <p className="text-sm font-semibold text-nowrap">
              تلفن پشتیبانی : ۸۵۷۴-۰۲۱
            </p>
          </div>
        </div>
        <div className="border-t-2 flex justify-center items-center p-4 ">
          <p className="text-sm text-[#282828]">
            © کلیه حقوق این وبسایت متعلق به تورینو میباشد.
          </p>
        </div>
      </div>
      <div className="hidden lg:grid grid-cols-2 grid-rows-[auto_auto_auto] px-32 border-t-2 pt-4">
        <div className="flex items-center justify-start gap-x-24 px-4 py-1 text-[#282828]">
          <div>
            <h3 className="text-2xl font-semibold mb-5">تورینو</h3>
            <ul className="text-lg leading-8 cursor-pointer">
              <li>درباره ما</li>
              <li>تماس با ما</li>
              <li>چرا تورینو</li>
              <li>بیمه مسافرتی</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-5">خدمات مشتریان</h3>
            <ul className="text-lg leading-8 cursor-pointer">
              <li>پشتیبانی آنلاین</li>
              <li>راهنمای خرید</li>
              <li>راهنمای استرداد</li>
              <li>پرسش و پاسخ</li>
            </ul>
          </div>
        </div>
        <div>
          {/* !!!!!!!!!!!!! */}
          <div className="flex-col justify-center items-center  px-4 py-1">
            <div className="flex flex-col items-end gap-y-3 mb-4">
              <Image
                src={rahyaarLogo}
                alt="rahyaar logo"
                width={146}
                height={44}
                priority={false}
                loading="lazy"
              />
              <p className="text-sm font-semibold text-nowrap">
                تلفن پشتیبانی : ۸۵۷۴-۰۲۱
              </p>
            </div>
            <div className="flex justify-end lg:gap-x-1 xl:gap-x-4 ">
              <Image
                src={ecunion_d}
                alt="ecunion logo"
                width={68}
                height={74}
                priority={false}
                loading="lazy"
              />
              <Image
                src={samandehi_d}
                alt="samandehi logo"
                width={67}
                height={74}
                priority={false}
                loading="lazy"
              />
              <Image
                src={aira_d}
                alt="aira logo"
                width={68}
                height={74}
                priority={false}
                loading="lazy"
              />
              <Image
                src={stateairline_d}
                alt="stateairline logo"
                width={78}
                height={74}
                priority={false}
                loading="lazy"
              />
              <Image
                src={passengerright_d}
                alt="passengerright logo"
                width={71}
                height={74}
                priority={false}
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 border-t-2 flex justify-center items-center p-4 ">
          <p className="text-sm text-[#282828]">
            © کلیه حقوق این وبسایت متعلق به رهیار می باشد.
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
