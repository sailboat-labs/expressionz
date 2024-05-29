import { cn } from "@/lib/misc.lib";

import { useEffect } from "react";

const PAGE_SPACING = 40;

const DummyPage = () => {
  useEffect(() => {
    document.body.style.setProperty("--page-spacing", `${PAGE_SPACING}px`);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <div className="relative  mx-auto flex h-[90vh] max-w-7xl flex-1 items-end">
        {/* Left cover content */}
        <div
          className={cn(
            "h-[calc(100%-100px)] flex-1 bg-[#7b3e07]",
            "border-[15px] border-r-0 border-orange-950",
          )}
        >
          {/* Metal strip */}
          <div className="absolute bottom-[7.5px] left-[7.5px] h-[25%] w-[10%] ">
            <div
              className={cn(
                "absolute bottom-0 left-0 h-full w-[20px]  bg-yellow",
                "border-4 border-orange-950",
              )}
            >
              <div
                className={cn(
                  "absolute right-full top-1/2 h-[90%] w-[20px] -translate-y-1/2 bg-orange-950",
                )}
              ></div>
              <div className="absolute bottom-full left-1/2 h-[10px] w-[15px] -translate-x-1/2 border-4 border-b-0 border-orange-950 bg-yellow"></div>
            </div>
            <div
              className={cn(
                "absolute bottom-0 left-0 h-[20px] w-full bg-yellow",
                "border-4 border-t-0 border-orange-950",
              )}
            >
              <div
                className={cn(
                  "absolute -top-[2px] right-0 h-[4px] w-[calc(100%-12px)]  bg-orange-950",
                )}
              ></div>
              <div
                className={cn(
                  "absolute left-1/2 top-full h-[20px] w-[90%] -translate-x-1/2 bg-orange-950",
                )}
              ></div>
              <div className="absolute left-full top-1/2 h-4/5 w-[10px] -translate-y-1/2 border-4 border-l-0 border-orange-950 bg-yellow"></div>
            </div>
          </div>

          <div
            className={cn(
              "ml-auto h-full w-[calc(100%-var(--page-spacing))] -translate-y-[var(--page-spacing)] bg-[#b8722e]",
              "border-t-[15px] border-orange-950",
            )}
          >
            {/* side borders */}
            <div
              className={cn(
                "pointer-events-none absolute -left-[15px] -top-[15px] h-[30px] w-full",
                "border-l-[15px] border-orange-950",
              )}
            ></div>

            {/* content */}
            <div
              className={cn(
                " ml-auto h-full w-[calc(100%-var(--page-spacing))]  -translate-y-[var(--page-spacing)]",
                "flex justify-center bg-[#fbaf68]",
                "border-t-[15px] border-orange-950",
              )}
            >
              {/* side borders */}
              <div
                className={cn(
                  "pointer-events-none absolute -left-[15px] -top-[15px] h-[30px] w-full",
                  "border-l-[15px] border-orange-950",
                )}
              ></div>

              {/* Content */}
              <div
                className={cn(
                  "relative flex  h-full w-[calc(100%-60px)]  -translate-y-[var(--page-spacing)] justify-center bg-[#fbd8b9]",
                  "border-t-[15px] border-orange-950",
                  "before:absolute before:bottom-full before:h-[40px] before:w-[90%] before:border-[15px]",
                  "before:border-b-0 before:border-orange-950 before:bg-[#fbd8b9]",
                )}
              >
                {/* side borders */}
                <div
                  className={cn(
                    "pointer-events-none absolute -inset-x-[15px] -top-[15px] h-[30px]",
                    "border-l-[15px] border-r-[15px] border-orange-950",
                  )}
                ></div>

                {/* Content */}
                <div className="absolute inset-0 -right-[30px] top-[15px] overflow-y-clip bg-[#fbd8b9] p-5 text-black">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  in temporibus minima odio impedit fugiat reprehenderit sed
                  aliquid. Beatae nobis officia assumenda, repellat inventore
                  quos mollitia, maiores officiis eum esse ipsa. Iste quia
                  deleniti repudiandae quisquam dolorum, ducimus totam dolore
                  laboriosam quo necessitatibus illum maiores ullam commodi
                  nobis iusto sed facere tempora ad, atque alias esse
                  praesentium? Perferendis consequatur aliquid, dolor similique
                  voluptate ipsam illum vel quis culpa perspiciatis aspernatur
                  laboriosam vitae pariatur voluptas molestiae nulla! Ullam nemo
                  cupiditate magni qui, velit iure culpa temporibus sed
                  consequatur quo necessitatibus earum possimus reiciendis
                  harum, veniam nulla sequi doloribus laudantium est dolores
                  cumque. Repudiandae, dolore? Nemo in suscipit perferendis
                  similique doloremque officia asperiores, alias distinctio
                  quaerat labore fugit numquam explicabo iste corrupti odit
                  quidem voluptatum architecto quia fugiat perspiciatis est
                  molestiae magnam possimus. Veniam accusantium quisquam rerum
                  nostrum placeat ut tempore quia expedita explicabo adipisci?
                  Repudiandae, nulla. Quaerat, optio blanditiis dignissimos
                  magni consequatur obcaecati. At quisquam iste magni harum
                  aliquid id commodi cumque error adipisci deserunt expedita
                  sed, voluptates quia, totam sit iusto amet atque minima ipsa
                  modi ut. Necessitatibus, ducimus dolore? Modi consequatur
                  distinctio enim suscipit tenetur eius quia iure, deleniti,
                  vero, molestiae perferendis hic harum minima incidunt beatae
                  ratione ducimus earum consequuntur accusantium quo corporis!
                  Dicta beatae dolor magnam? Distinctio, excepturi inventore?
                  Cum, repellat modi sapiente ipsum maxime dignissimos
                  voluptatibus ipsa laboriosam libero labore tempore. Commodi ad
                  incidunt enim praesentium nulla, vel culpa tempora? Odit
                  dolores impedit eius quia ipsa beatae laudantium fugiat quis
                  unde aliquid ab, quos quidem a, saepe nihil fugit magni sequi?
                  Laborum doloribus odit quae, cumque esse voluptates iure,
                  delectus eius tenetur, asperiores nulla similique blanditiis
                  aliquam! A possimus molestias distinctio velit dolore saepe,
                  nam maxime doloremque aut ut perferendis. Ut eos recusandae
                  aperiam inventore obcaecati, cupiditate reprehenderit quod
                  officia voluptates veritatis alias temporibus dolorem deserunt
                  similique sequi id nostrum saepe impedit repellat! Hic maiores
                  rerum illum inventore perferendis ipsam deserunt nulla sunt
                  nostrum ratione ipsa quisquam consequuntur sequi minus et,
                  accusantium fuga. Dolor voluptate blanditiis saepe, expedita
                  totam, reiciendis illo incidunt adipisci nisi nulla earum quae
                  quod! Illum earum optio, rerum facere excepturi neque dolores
                  praesentium ipsum, ullam natus cumque eaque? Hic eligendi
                  facere sunt? Corporis optio aspernatur, ipsa, vero, eligendi
                  tenetur ipsum illum numquam enim quae voluptates! Hic,
                  sapiente, nemo iure id non ducimus blanditiis nobis doloribus
                  praesentium ipsum ipsa. Natus repellendus molestias labore
                  corrupti possimus ducimus accusamus in vel soluta modi veniam
                  porro, consectetur alias? Consequatur rerum ea, earum
                  praesentium molestias saepe quae aperiam adipisci ipsam odio
                  explicabo dolores? Non, incidunt iure. Rerum, vitae tempore?
                  Sunt praesentium expedita fuga possimus provident id magnam
                  inventore dolorum iste quae, quisquam temporibus eaque
                  voluptate optio repudiandae, voluptates aliquid culpa quo
                  eveniet sequi ipsa tempore, quaerat officiis delectus. Omnis
                  rem porro, perspiciatis molestias quisquam impedit. Tempore
                  impedit neque illo inventore facere eligendi, aliquid minima
                  dignissimos unde deleniti iste facilis aut beatae iure,
                  incidunt amet saepe necessitatibus aperiam veniam officia
                  corrupti suscipit. Totam neque aperiam, aliquid, rem aliquam
                  inventore recusandae nostrum voluptate modi delectus
                  laboriosam soluta est. Modi.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right cover content */}
        <div
          className={cn(
            "h-[calc(100%-100px)] flex-1 bg-[#7b3e07]",
            "relative border-[15px] border-orange-950",
          )}
        >
          {/* Metal strip */}
          <div className="absolute bottom-0 right-0 h-[25%] w-[20%] ">
            <div
              className={cn(
                "absolute -right-[7.5px] bottom-[7.5px] h-full w-[20px]  bg-yellow",
                "border-4 border-orange-950",
              )}
            >
              <div
                className={cn(
                  "absolute left-full top-1/2 h-[90%] w-[20px] -translate-y-1/2 bg-orange-950",
                )}
              ></div>
              <div className="absolute bottom-full left-1/2 h-[10px] w-[15px] -translate-x-1/2 border-4 border-b-0 border-orange-950 bg-yellow"></div>
            </div>
            <div
              className={cn(
                "absolute -bottom-[7.5px] -right-[7.5px] h-[20px] w-full bg-yellow",
                "border-4 border-t-0 border-orange-950",
              )}
            >
              <div
                className={cn(
                  "absolute -top-[2px] left-0 h-[4px] w-[calc(100%-12px)]  bg-orange-950",
                )}
              ></div>
              <div
                className={cn(
                  "absolute left-1/2 top-full h-[20px] w-[90%] -translate-x-1/2 bg-orange-950",
                )}
              ></div>
              <div className="absolute right-full top-1/2 h-4/5 w-[10px] -translate-y-1/2 border-4 border-r-0 border-orange-950 bg-yellow"></div>
            </div>
          </div>

          <div
            className={cn(
              "mr-auto h-full w-[calc(100%-var(--page-spacing))] -translate-y-[var(--page-spacing)] bg-[#b8722e]",
              "border-t-[15px] border-orange-950",
            )}
          >
            {/* side borders */}
            <div
              className={cn(
                "pointer-events-none absolute -left-[15px] -top-[15px] h-[30px] w-full",
                "border-l-[15px] border-orange-950",
              )}
            ></div>

            {/* content */}
            <div
              className={cn(
                " mr-auto h-full w-[calc(100%-var(--page-spacing))]  -translate-y-[var(--page-spacing)]",
                "flex justify-center bg-[#fbaf68]",
                "border-t-[15px] border-orange-950",
              )}
            >
              {/* side borders */}
              <div
                className={cn(
                  "pointer-events-none absolute -left-[15px] -top-[15px] h-[30px] w-full",
                  "border-l-[15px] border-orange-950",
                )}
              ></div>

              {/* Content */}
              <div
                className={cn(
                  "relative flex  h-full w-[calc(100%-60px)]  -translate-y-[var(--page-spacing)] justify-center bg-[#fbd8b9]",
                  "border-t-[15px] border-orange-950",
                  "before:absolute before:bottom-full before:h-[40px] before:w-[90%] before:border-[15px]",
                  "before:border-b-0 before:border-orange-950 before:bg-[#fbd8b9]",
                )}
              >
                {/* side borders */}
                <div
                  className={cn(
                    "pointer-events-none absolute -inset-x-[15px] -top-[15px] h-[30px]",
                    "border-l-[15px] border-r-[15px] border-orange-950",
                  )}
                ></div>

                {/* Content */}
                <div className="absolute inset-0 -left-[30px] top-[15px] overflow-y-clip bg-[#fbd8b9] p-5 text-black">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  in temporibus minima odio impedit fugiat reprehenderit sed
                  aliquid. Beatae nobis officia assumenda, repellat inventore
                  quos mollitia, maiores officiis eum esse ipsa. Iste quia
                  deleniti repudiandae quisquam dolorum, ducimus totam dolore
                  laboriosam quo necessitatibus illum maiores ullam commodi
                  nobis iusto sed facere tempora ad, atque alias esse
                  praesentium? Perferendis consequatur aliquid, dolor similique
                  voluptate ipsam illum vel quis culpa perspiciatis aspernatur
                  laboriosam vitae pariatur voluptas molestiae nulla! Ullam nemo
                  cupiditate magni qui, velit iure culpa temporibus sed
                  consequatur quo necessitatibus earum possimus reiciendis
                  harum, veniam nulla sequi doloribus laudantium est dolores
                  cumque. Repudiandae, dolore? Nemo in suscipit perferendis
                  similique doloremque officia asperiores, alias distinctio
                  quaerat labore fugit numquam explicabo iste corrupti odit
                  quidem voluptatum architecto quia fugiat perspiciatis est
                  molestiae magnam possimus. Veniam accusantium quisquam rerum
                  nostrum placeat ut tempore quia expedita explicabo adipisci?
                  Repudiandae, nulla. Quaerat, optio blanditiis dignissimos
                  magni consequatur obcaecati. At quisquam iste magni harum
                  aliquid id commodi cumque error adipisci deserunt expedita
                  sed, voluptates quia, totam sit iusto amet atque minima ipsa
                  modi ut. Necessitatibus, ducimus dolore? Modi consequatur
                  distinctio enim suscipit tenetur eius quia iure, deleniti,
                  vero, molestiae perferendis hic harum minima incidunt beatae
                  ratione ducimus earum consequuntur accusantium quo corporis!
                  Dicta beatae dolor magnam? Distinctio, excepturi inventore?
                  Cum, repellat modi sapiente ipsum maxime dignissimos
                  voluptatibus ipsa laboriosam libero labore tempore. Commodi ad
                  incidunt enim praesentium nulla, vel culpa tempora? Odit
                  dolores impedit eius quia ipsa beatae laudantium fugiat quis
                  unde aliquid ab, quos quidem a, saepe nihil fugit magni sequi?
                  Laborum doloribus odit quae, cumque esse voluptates iure,
                  delectus eius tenetur, asperiores nulla similique blanditiis
                  aliquam! A possimus molestias distinctio velit dolore saepe,
                  nam maxime doloremque aut ut perferendis. Ut eos recusandae
                  aperiam inventore obcaecati, cupiditate reprehenderit quod
                  officia voluptates veritatis alias temporibus dolorem deserunt
                  similique sequi id nostrum saepe impedit repellat! Hic maiores
                  rerum illum inventore perferendis ipsam deserunt nulla sunt
                  nostrum ratione ipsa quisquam consequuntur sequi minus et,
                  accusantium fuga. Dolor voluptate blanditiis saepe, expedita
                  totam, reiciendis illo incidunt adipisci nisi nulla earum quae
                  quod! Illum earum optio, rerum facere excepturi neque dolores
                  praesentium ipsum, ullam natus cumque eaque? Hic eligendi
                  facere sunt? Corporis optio aspernatur, ipsa, vero, eligendi
                  tenetur ipsum illum numquam enim quae voluptates! Hic,
                  sapiente, nemo iure id non ducimus blanditiis nobis doloribus
                  praesentium ipsum ipsa. Natus repellendus molestias labore
                  corrupti possimus ducimus accusamus in vel soluta modi veniam
                  porro, consectetur alias? Consequatur rerum ea, earum
                  praesentium molestias saepe quae aperiam adipisci ipsam odio
                  explicabo dolores? Non, incidunt iure. Rerum, vitae tempore?
                  Sunt praesentium expedita fuga possimus provident id magnam
                  inventore dolorum iste quae, quisquam temporibus eaque
                  voluptate optio repudiandae, voluptates aliquid culpa quo
                  eveniet sequi ipsa tempore, quaerat officiis delectus. Omnis
                  rem porro, perspiciatis molestias quisquam impedit. Tempore
                  impedit neque illo inventore facere eligendi, aliquid minima
                  dignissimos unde deleniti iste facilis aut beatae iure,
                  incidunt amet saepe necessitatibus aperiam veniam officia
                  corrupti suscipit. Totam neque aperiam, aliquid, rem aliquam
                  inventore recusandae nostrum voluptate modi delectus
                  laboriosam soluta est. Modi.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div
          className={cn(
            "absolute bottom-0 left-1/2  -translate-x-1/2  bg-darkPurple",
            "h-[60px] w-[100px] border-[15px] border-b-0 border-orange-950",
            "before:absolute before:-top-[30px] before:left-1/2 before:-translate-x-1/2",
            "before:h-[20px] before:w-[30px] before:bg-orange-950",
          )}
        ></div>
      </div>
    </div>
  );
};

export default DummyPage;
