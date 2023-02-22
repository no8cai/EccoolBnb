'use strict';

const bcrypt = require("bcryptjs");
const { faker } = require('@faker-js/faker');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const imagelist={
  5:[
    "https://a0.muscache.com/im/pictures/miso/Hosting-683950152227050734/original/aaa3f2d2-cbd0-4979-90fb-fa3a0f3220f5.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-683950152227050734/original/10e56114-ca78-4b45-86a7-8bccc1b27253.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-683950152227050734/original/6c82043b-3a73-4111-b668-9ed106f68ba8.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-683950152227050734/original/eae8460e-81b9-484a-ac04-de0c353ef1ea.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-683950152227050734/original/577d6d78-e4b8-4649-b4aa-272ab56b51a2.jpeg?im_w=1200"
  ],
  6:[
    "https://a0.muscache.com/im/pictures/648c033e-6c44-4053-80e3-a2f1203b9b2d.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/789defb4-ffa4-4be1-9a7c-97608eeab7d6.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/99d1a623-d11a-437e-b544-1a5a19fd0116.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/f1b65220-fbe6-4da8-86a0-1d4805bbf3dc.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/b277df03-3f54-423a-a8d7-3e82be49a02a.jpg?im_w=1200"
  ],
  7:[
    "https://a0.muscache.com/im/pictures/miso/Hosting-628879805818688112/original/05903e95-8395-48b9-a8a3-e1666ce65894.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-628879805818688112/original/cc160305-a314-45e8-84dd-cf89eda4b0e4.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-628879805818688112/original/dd96db74-d5d1-4f88-94ff-047770bd3fc3.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-628879805818688112/original/4c166ab4-233f-4199-af23-e39ef375403f.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-628879805818688112/original/9e2a54fd-0905-4ff3-83d8-2ea2bafda0f7.jpeg?im_w=1200"
  ],
  8:[
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-556752345004889925/original/feffb840-4cc5-44a7-99d0-c49972ccbac5.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-556752345004889925/original/ea2da3e4-6b6b-4521-ac3f-b48460750743.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-556752345004889925/original/99f5976b-1740-49f7-b346-f6367fb3648b.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-556752345004889925/original/76b18c52-a524-4d2f-99a8-97d5a2e07959.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-556752345004889925/original/1afc359d-8421-4390-a41c-a642a42bf431.jpeg?im_w=1200"
  ],
  9:[
    "https://a0.muscache.com/im/pictures/miso/Hosting-54289368/original/5cb221f1-e112-45c3-b179-543d44dce4c3.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-54289368/original/d1e9d4ed-abea-4078-a993-23244a9fa6ec.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-54289368/original/1f8a6b8e-b58c-4ca1-afb0-8e89fd725eda.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-54289368/original/777a7a59-ffeb-406b-b74a-1ad99b95c351.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-54289368/original/b8b89e3f-ef43-4258-9a5e-0db3b2a681b3.jpeg?im_w=1200"
  ],
  10:[
    "https://a0.muscache.com/im/pictures/37167ef5-455e-4332-aead-9683c6285be5.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/d1b12187-5260-4748-886f-256ed2db6c6f.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/f2407bcb-0a9e-4988-93d0-4f4048eba712.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/290b126a-be74-4dbb-b3f3-779e12ec0895.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/945a7c9b-e7a1-46b9-bf27-540f8e320f2d.jpg?im_w=1200"
  ],
  11:[
    "https://a0.muscache.com/im/pictures/9539ec1a-1929-44b9-a0de-efbb61627b34.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/b48896c7-e2e2-4442-ad9f-49ad0ec8e175.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/1f49d9b6-2d0e-4d1a-a994-60798374beaf.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/45a4804c-6e2b-4acb-9427-6788a6146032.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/3bdf32dd-b93e-42ce-9e18-eea8cb3c78f3.jpg?im_w=1200"
  ],
  12:[
    "https://a0.muscache.com/im/pictures/miso/Hosting-40755837/original/50ee41f2-6f8e-454f-85fc-2a199339847f.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/cacff7a1-0089-4811-880e-4f8cf6537348.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-40755837/original/11ea7f45-cfd3-4424-b05e-29a0da7fc97e.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-40755837/original/ab8784d2-8fda-4294-89f2-e304e4f69d07.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/d34164fe-d5af-46c8-b4ad-3d15ad4ff3e6.jpg?im_w=1200"
  ],
  13:[
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-554398018136506639/original/dd306c93-7bd1-42b0-b937-45943d1c712b.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-554398018136506639/original/bad7e16c-97fc-498e-ac32-23640818c61d.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-554398018136506639/original/bf44e555-538a-4729-8098-5f7c2e6aae3f.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-554398018136506639/original/a473c4c6-c2b2-4ce9-8156-3e915fd26b69.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-554398018136506639/original/44f19180-a83d-4325-86a1-f0b3c6acb2a6.jpeg?im_w=1200"
  ],
  14:[
    "https://a0.muscache.com/im/pictures/miso/Hosting-650616895009686737/original/e98edb6f-1a6e-4f24-a3fe-08b4f9169543.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-650616895009686737/original/bd2d88b1-3bde-4307-95fa-3f261adc3aa5.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-650616895009686737/original/0480d1a5-649e-4df2-9fee-8bb9159c2cbd.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-650616895009686737/original/e9ad5e5e-82d9-41cf-9026-f099892bddad.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-650616895009686737/original/70ab6f79-ced3-497c-a03f-7dffa453e1ae.jpeg?im_w=1200"
  ],
  15:[
    "https://a0.muscache.com/im/pictures/miso/Hosting-638604110655993140/original/c63d00f4-9b3a-45b2-b0c2-22e4f00ebcab.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-638604110655993140/original/452bd825-31a7-4b25-9841-c373cf241372.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/aed979ff-d115-4739-89b2-16f99208e658.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-638604110655993140/original/a0429975-f278-4d32-9344-69a94064a2d8.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-638604110655993140/original/45d1b54d-a972-429b-aa4e-d955652dccd8.jpeg?im_w=1200"
  ],
  16:[
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-54407382/original/c080ee6b-5ee9-49e6-8af1-3796351352c6.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-54407382/original/09f023b3-a6a5-43aa-95a8-8eb8be8dfdda.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-54407382/original/9f11af7b-9cfc-40be-ae85-048cf90c752e.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-54407382/original/c4313fde-e097-4030-be4b-c18d751b41fe.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-54407382/original/b976bd40-e701-447f-9144-923448965fa6.jpeg?im_w=1200"
  ],
  17:[
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-623228023153803713/original/0ecb2b65-e957-4044-9163-e21da28ea3cd.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-623228023153803713/original/2cdef548-838b-4a7f-a86b-1244c9c6175c.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-623228023153803713/original/07e47d67-6b4d-4ff3-b27c-2b8bd31183f0.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-623228023153803713/original/f3a207da-3baf-4a23-ae51-a8048ae6240d.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-623228023153803713/original/7465daaf-a7d4-43f5-87fd-4ea75f9382f7.jpeg?im_w=1200"
  ],
  18:[
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-609235423950817217/original/99ba9fd4-537b-4d30-8ecd-d7504fe40eee.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-609235423950817217/original/85cf304d-74df-4af5-a3cf-1853a2f5efa0.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-609235423950817217/original/18fd6af6-6156-4097-a633-ccdd137dc125.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-609235423950817217/original/0fec18fa-f45c-4a2e-9301-e26e673d64cb.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-609235423950817217/original/3da646d4-00e8-4257-8750-219dceabed36.jpeg?im_w=1200"
  ],
  19:[
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-660725965460104134/original/5a9db921-c5be-4ce0-b54d-5b5e3cc33988.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-660725965460104134/original/b656a065-ba19-459a-925d-582ee88aae65.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-660725965460104134/original/dbff7340-372a-405f-b517-0fec1e3dca85.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-660725965460104134/original/4ae2734c-b21e-4cbe-8c07-60971d85220e.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-660725965460104134/original/45386757-2542-4c62-824c-b21adacc8ef6.jpeg?im_w=1200"
  ],
  20:[
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-666163193906376766/original/a5046969-7460-40c4-a93d-6ac26707e073.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-666163193906376766/original/faddc0b3-fd3c-4313-bbd8-1ca5e885dcf7.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-666163193906376766/original/b75e2928-8660-46ba-aa1c-9d2afc74ac0e.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-666163193906376766/original/a40d2d5d-a5d2-481f-b5e5-4ffad75644d6.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-666163193906376766/original/ddf97a61-719e-43f2-bcee-57fd09ec2c76.jpeg?im_w=1200"
  ],
  21:[
    "https://a0.muscache.com/im/pictures/miso/Hosting-48319102/original/7d372a91-15de-4432-8e7e-4f2e742026e9.png?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-48319102/original/fc98339b-d199-4126-9ea8-5310137ba587.png?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-48319102/original/29f974d5-adbb-4036-90b1-c345a9d7a52e.png?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-48319102/original/1fb0cd10-c1c7-4bc5-925c-a31650eb9fef.png?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-48319102/original/16779bd6-fcb2-41a4-963c-7e6eb2953b0e.png?im_w=1200"
  ],
  22:[
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-37959149/original/855e7e9d-6482-4b70-8b63-e677b2b5d234.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-37959149/original/7d871fa4-bed3-426b-a033-9f8b1714f563.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-37959149/original/04eb13da-2d86-438f-b526-c9b9cc0869ed.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-37959149/original/6f341ef2-8de5-4eab-8efd-e226db2ab81d.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-37959149/original/26d6930a-775b-4771-b579-b78b410b7889.jpeg?im_w=1200"
  ],
  23:[
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-18371863/original/ed971999-8da9-4b55-831d-a2efe72070bb.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-18371863/original/805d138b-f399-4bed-aea8-9a300fd45477.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-18371863/original/62e2cdad-4d67-477e-84ef-8ff74e8fb6fd.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-18371863/original/5507da3b-5202-4b28-b55a-19fdb50ea20e.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-18371863/original/cd6e2fe0-535d-46b1-8c89-e71d8b8bae28.jpeg?im_w=1200"
  ],
  24:[
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-608741827331450503/original/412b801e-a5b5-4d02-a202-832b2d016571.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-608741827331450503/original/5149e442-7956-43f9-a669-9bedba157d9f.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-608741827331450503/original/9fbf5bcb-b2c4-4c03-8de1-03719652c5d0.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-608741827331450503/original/29b1804a-5569-49e6-aeb2-c34239b18b34.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-608741827331450503/original/9d21d588-bb53-4f59-a0fb-ab8e9adef141.jpeg?im_w=1200"
  ],
}



function spotImagegenerator(spId,idx){
  return {
    spotId: spId,
    url: imagelist[spId][idx],
    preview:true
  }
}

function* generateSpotImage(){
  for(let spotId=5;spotId<=24;spotId++){
    for(let index=0;index<5;index++){
      yield spotImagegenerator(spotId,index)
    }
  }
}


module.exports = {
  async up (queryInterface, Sequelize) {

     options.tableName = "SpotImages";
     await queryInterface.bulkInsert(options, [
      {
       spotId: 1,
       url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-600554227160952742/original/ae22ea96-7858-4d5b-bb0c-17e3c8be1f62.jpeg?im_w=720',
       preview:true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-600554227160952742/original/762a56a6-22d1-4f90-880e-359783640afa.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-600554227160952742/original/96618dc7-dcfc-4c68-8479-6c0ff3294ee3.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-600554227160952742/original/6912648a-7f67-4a99-a299-c0208b31e15b.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-600554227160952742/original/0a9d76ad-d1ef-4c1d-b70e-2be241668986.jpeg?im_w=720',
        preview:true
       },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53238649/original/68f481fd-3ab1-40e7-8180-1b3bf2cf4f57.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53238649/original/9fcdd8ce-c7cd-4984-beaf-b2d4c0c60d8b.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53238649/original/0ef2f2be-b641-4554-a7f2-e9bc8815bd55.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53238649/original/2457f2f4-cff8-41b0-8718-a233380ab856.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53238649/original/078457fb-977c-4bb1-8c37-e6b55408d71e.jpeg?im_w=720',
        preview:true
       },
       {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/535dc654-1f6a-4b61-874f-a88808394114.jpg?im_w=1200',
        preview:true
       },       {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/c3c19600-3e87-4e1f-8048-c31166280639.jpg?im_w=1200',
        preview:true
       },
       {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/b83ebde8-f783-4a4f-854a-d64d1e9dabc3.jpg?im_w=1200',
        preview:true
       },
       {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/2a4b5182-ff05-47cb-883c-c6bc2ddfea84.jpg?im_w=1200',
        preview:true
       },
       {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-47543514/original/7ff41a7f-d71b-49be-aae6-8f5911fa2592.jpeg?im_w=1200',
        preview:true
       },

       {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-591906991257269699/original/17cd12bd-f197-4e8d-bb17-80c99fbc478a.jpeg?im_w=1200',
        preview:true
       },
       
       {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-591906991257269699/original/e88c68ef-8b4f-43d1-ad70-97a4002d55ae.jpeg?im_w=1200',
        preview:true
       },
       
       {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-591906991257269699/original/c9542006-3e9d-4364-82d8-8e556ccdb8a1.jpeg?im_w=1200',
        preview:true
       },
       
       {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-591906991257269699/original/a5f01591-0218-4215-b4b2-1c888ccbc381.jpeg?im_w=1200',
        preview:true
       },
       
       {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-591906991257269699/original/fcad31e9-bded-43b9-b4ed-a7c17f2d9fac.jpeg?im_w=1200',
        preview:true
       },
       ...generateSpotImage(),

  ], {});
  },

  async down (queryInterface, Sequelize) {

     options.tableName = "SpotImages";
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
     }, {});
  }
};
