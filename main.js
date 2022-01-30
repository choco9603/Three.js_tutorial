let scene,camera,renderer,cube1,cube2,sphere,torus;

function init(){

/*シーン*/
scene = new THREE.Scene();

/*カメラ*/
camera = new THREE.PerspectiveCamera(20,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);


/*レンダラー*/
renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

/*マテリアル作成*/
const material1 = new THREE.MeshBasicMaterial({color: 0x6699FF});//ライティングを考慮しないマテリアル
const material2 = new THREE.MeshNormalMaterial();//ノーマルのカラーをRGBで可視化するマテリアル
const material3 = new THREE.MeshStandardMaterial({color: 0x6699FF, roughness:0});//物理ベースレンダリングのマテリアル
const material4 = new THREE.MeshToonMaterial({color: 0x6699FF});//アニメのようなトゥーンシェーディングを実現できるマテリアル

/*ボックスの設定*/
const geometry1 = new THREE.BoxGeometry(2, 2, 2);
cube1 = new THREE.Mesh(geometry1,material1);//cube1メッシュ作成
cube2 = new THREE.Mesh(geometry1,material2);//cube2メッシュ作成

/*球体の設定*/
const geometry2 = new THREE.SphereGeometry(1.5,20,20);
sphere = new THREE.Mesh(geometry2,material4);//sphereメッシュ作成

/*ドーナツ型の設定*/
const geometry3 = new THREE.TorusGeometry(1,0.4, 5, 100);
torus = new THREE.Mesh(geometry3,material3);//torusメッシュ作成

/*表示位置調整*/
cube1.position.x = -3;
cube2.position.x = 3;
sphere.position.y = -2;
torus.position.y = 2;

/*メッシュ追加*/
scene.add(cube1,cube2,sphere,torus);

/*カメラ位置調整*/
camera.position.z = 50;


/*ライト設置*/
//平行光源
const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

// ポイント光源
const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
  scene.add(pointLight);
/*const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);*/
  
}


/*アニメーション制御*/
function animate(){
  requestAnimationFrame(animate);
  
  cube1.rotation.x +=0.04;
  cube1.rotation.y +=0.04;
  cube1.rotation.z +=0.01;
  
  cube2.rotation.x -= 0.02;
  cube2.rotation.y -= 0.02;
  
  sphere.rotation.x += 0.06;
  sphere.rotation.y -= 0.06;
  //sphere.rotation.z -= 0.06;
  
  torus.rotation.x += 0.008;
  torus.rotation.y -= 0.008;
  torus.rotation.z += 0.008;
  
  renderer.render(scene,camera);
}


/*ウインドウ変更時にサイズを維持する処理*/
function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
}

window.addEventListener("resize",onWindowResize);

init();

animate();

