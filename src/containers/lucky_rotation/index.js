import React from 'react'
import { bindActionCreators } from 'redux'
import Pagination from "react-js-pagination";
import { connect } from 'react-redux'
import './css/style.css';
import {
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn,
	getTuDo,
	getHistoryTuDo,
	getCodeBonus,
	getVinhDanh,
} from '../../modules/lucky'
import Wheel from './Winwheel'
import {
	getData
} from '../../modules/profile'
import rotaion from './images/muivongquay.png'

import backtotop from './images/backtotop.png'
import sukiendangdienra from './images/btn-sukiendangdienra.png'
import livestream from './images/btn_livestream.png'
import sapdienra from './images/btn-sapdienra.png'
import ketthuc from './images/btn-ketthuc.png'
import logo from './images/logo.png';
import thamgiangay from './images/btn-thamgiangay.gif';
import iphone_11_pro_max from './images/iphone-11-pro-max.png';
import vqmm_p2 from './images/vqmm-p2.png';
import btn_quay_p2 from './images/btn-quay-p2.png';
import honda from './images/honda.png';
import iphone_xs from './images/iphone-xs.png';
// import xiaomi_black from './images/xiaomi-black-shark-2.png';
import icon_bangvinhdanh from './images/icon-bangvinhdanh.png';
import logo_splay from './images/logo_splay.png';
import logo_scoin from './images/logo_scoin.png';
import img_phanthuong from './images/img-phanthuong.png';
import btn_close from './images/btn-close.png';
import img_card10k from './images/img-card10k.png';
import img_card50k from './images/img-card50k.png';
import img_card100k from './images/img-card100k.png';
import img_card500k from './images/img-card500k.png';
import img_thele from './images/img-thele.png';
import img_tudo from './images/img-tudo.png';
import img_maduthuong from './images/img-maduthuong.png';
import img_thongbao from './images/img-thongbao.png';
import img_livestream from './images/img-livestream.png';
import img_giaithuong_1 from './images/img-giaithuong-1.png';
import img_giaithuong_2 from './images/img-giaithuong-2.png';
import img_giaithuong_1m from './images/img-giaithuong-1m.png';
import img_giaithuong_2m from './images/img-giaithuong-2m.png';
// import muiten from './images/muiten.png';
import ReactResizeDetector from 'react-resize-detector'
import spin from './images/spin.gif';
import hot from './images/hot.gif';
import icon_add from './images/icon-add.png';
import icon_gift_box from './images/icon-gift-box.png';
import icon_history from './images/icon-history.png';
import icon_ticket from './images/icon-ticket.png';
import $ from 'jquery';
import 'bootstrap';

const styles = {
	paper: {
		background: "#fff",
	},
};

class Lucky_Rotation extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			limit: 10,
			offsetTuDo: 0,
			offsetCode: 0,
			offsetVinhDanh: 0,
			numberShow:15,
			isAll:true,
			wheelPower:0,
			wheelSpinning:false,
			stop:true,
			theWheel:null,
			auto: false,
			userTurnSpin:{},
			itemOfSpin:[],
			luckySpin:{},
			userTurnSpin:{},
			turnsFree:0,
			isLogin:false,
			day:'00',
			hour:'00', 
			minute:'00', 
			second:'00',
			itemBonus:{},
			activeCodeBonus:1,
			activeVinhDanh:1,
			activeTuDo:1,
			activeHistory:1,
			countVinhDanh:0,
			countHistory:0,
			countTuDo:0,
			countCodeBonus:0,
			dataVinhDanh:[],
			dataTuDo:[],
			dataCodeBonus:[],
			listVinhDanh:[],
			listTuDo:[],
			listHistory:[],
			listCodeBonus:[],
			width:0,
			height:0,
			img_width:0,
			img_height:0,
			code:false,
			scoinCard:false,
			inputValue: '',
			noti_mdt:false,
			noti_tudo:false,
			numberPage:3,
			img_status: ketthuc,
			message_status:'',
			data_auto:[],
			isSpin:false,
			closeAuto:true,
			message_error:'',
			server_err:false,
			finished:false,
			hour_live:'00', 
			minute_live:'00', 
			second_live:'00',
			linkLiveStream:'',
			isLive:false,
			user:{},
			xacthuc:false,
		};
	}
	componentWillMount(){
		var scoin_token=this.getParamValue("ud");
		this.onResize()
		window.removeEventListener('scroll', this.handleScroll);
		
		if(scoin_token!=="" && scoin_token!==undefined){
			this.setState({scoin_token: scoin_token})
		}		
	}



	componentDidMount(){
		const {img_width, img_height}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		// this.timeShowLive();
		if (user !== null) {
			this.props.getRotationDetailDataUser(user.access_token, 119).then(()=>{
				var data=this.props.dataRotationWithUser;
				if(data!==undefined){
					if(data.status==='01'){
						this.getStatus(data.data.luckySpin);
						this.setState({userTurnSpin:data.data.userTurnSpin, user:user, itemOfSpin:data.data.itemOfSpin, luckySpin:data.data.luckySpin, turnsFree:(data.data.userTurnSpin.turnsFree+data.data.userTurnSpin.turnsBuy), isLogin:true, linkLiveStream:data.data.luckySpin.linkLiveStream})
					}else{
						$('#myModal11').modal('show');
						this.setState({message_error:'Không lấy được dữ liệu người dùng. Vui lòng tải lại trang.'})
					}
				}else{
					$('#myModal12').modal('show');
					this.setState({server_err:true})
				}
				
			});
		} else {
			this.props.getRotationDetailData(119).then(()=>{
				var data=this.props.dataRotation;
				if(data!==undefined){
					if(data.status==='01'){
						this.getStatus(data.data.luckySpin);
						this.setState({userTurnSpin:data.data.userTurnSpin, itemOfSpin:data.data.itemOfSpin, luckySpin:data.data.luckySpin, turnsFree:(data.data.userTurnSpin.turnsFree+data.data.userTurnSpin.turnsBuy), isLogin:false, linkLiveStream:data.data.luckySpin.linkLiveStream})
					}else{
						$('#myModal11').modal('show');
						this.setState({message_error:'Không lấy được dữ liệu.  Vui lòng tải lại trang.'})
					}
				}else{
					$('#myModal12').modal('show');
					this.setState({server_err:true})
				}
			});
		}
		this.getVinhDanh(1);
		
		let theWheel = new Wheel({
			'numSegments'       : 10,         // Specify number of segments.
			'outerRadius'       : 150,       // Set outer radius so wheel fits inside the background.
			'drawMode'          : 'image',   // drawMode must be set to image.
			'drawText'          : true,      // Need to set this true if want code-drawn text on image wheels.
			'textFontSize'      : 12,        // Set text options as desired.
			'textOrientation'   : 'curved',
			'textDirection'     : 'reversed',
			'textAlignment'     : 'outer',
			'textMargin'        : 5,
			'textFontFamily'    : 'monospace',
			'textStrokeStyle'   : 'black',
			'textLineWidth'     : 2,
			'responsive'   : true,
			'textFillStyle'     : 'white',

			'animation' :                 
			{
				'type'     : 'spinToStop',
				'duration' : 5,    
				'spins'    : 10,    
				'callbackFinished' : this.completeRotation
			}
		});

		let loadedImg = new Image();
		loadedImg.onload = function()
		{
			theWheel.wheelImage = loadedImg;   
			theWheel.draw();                    
		}
		loadedImg.width=img_width;
		loadedImg.height=img_height;
		loadedImg.src = rotaion;
		this.setState({theWheel:theWheel})
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
		this.setState({ auto : !this.state.auto});
	}

	getParamValue=(key)=>
	{
		var url = window.location.search.substring(1);
		var qArray = url.split('&');
		for (var i = 0; i < qArray.length; i++) 
		{
			var pArr = qArray[i].split('=');
			if (pArr[0] === key) 
				return pArr[1];
		}
	}

	onResize=()=>{
		if (window.innerWidth <= 320) {
			this.setState({ width: 210, height: 235, img_width:170, img_height:170});
		}
		if (window.innerWidth > 320 && window.innerWidth <= 480) {
			this.setState({ width: 250, height: 280, img_width:200, img_height:200});
		}
		if (window.innerWidth > 480 && window.innerWidth <= 600) {
			this.setState({ width: 335, height: 375, img_width:270, img_height:270});
		}
		if (window.innerWidth > 600 && window.innerWidth <= 768) {
			this.setState({ width: 470, height: 525, img_width:375, img_height:375});
		}
		if (window.innerWidth > 768 && window.innerWidth < 1024) {
			this.setState({ width: 504, height: 563, img_width:405, img_height:405});
		}
		if (window.innerWidth >= 1024) {
			this.setState({ width: 670, height: 752, img_width:540, img_height:540});
		}
	}

	getVinhDanh=(pageNumber)=>{
		const {limit}=this.state;
		this.props.getVinhDanh(119, limit, (pageNumber-1)).then(()=>{
			var data=this.props.dataVinhDanh;
			if(data!==undefined){
				if(data.status==='01'){	
					this.setState({listVinhDanh:data.data, countVinhDanh:data.totalRecords})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Không lấy được dữ liệu bảng vinh danh.'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	getStatus=(luckySpin)=>{
		var start=luckySpin.startDate;
		var end=luckySpin.endDate;
		var time=Date.now();

		// var distance_3day=start - 3 * 86400 * 1000;
		// var duration=end-time;

		if (time < start) {
			this.timeRemain(start)
			this.setState({ img_status: sapdienra, message_status:"Sự kiện chưa diễn ra."});
		}
		if (time > start && time < end) {
			this.timeRemain(end)
			this.setState({ img_status: sukiendangdienra});
		}
		if (time > end) {
			this.setState({ img_status: ketthuc, message_status:"Sự kiện đã kết thúc."});
				// $('#myModal14').modal('show');
		}
	}

	handleScroll = (event) => {
		if (document.body.getBoundingClientRect().top < -300){
			$("#button").show();
		}else{
			$("#button").hide();
		}
	}

	start=()=>{
		const {turnsFree, itemOfSpin, luckySpin, isSpin, closeAuto, finished}=this.state;
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var time=Date.now();
		// if(time > luckySpin.endDate){
		// 	this.setState({message_status:"Vòng quay đã kết thúc."},()=>{
		// 		$('#myModal8').modal('show');
		// 	})
		// }else{
			// if (user !== null) {
				if(!finished){
					if(turnsFree>0){
						this.props.pickCard(user.access_token, luckySpin.id).then(()=>{
							var data=_this.props.dataPick;
							var list=this.state.data_auto;
							if(data!==undefined){
								if(data.status ==="01"){
									if(data.data.item.type==="LUCKY_NUMBER"){
										this.setState({code:true})
										setTimeout(()=>{
											this.setState({noti_mdt:true})
										},2000)
									}else{
										if(data.data.item.type!=="ACTION"){
											setTimeout(()=>{
												this.setState({noti_tudo:true})
											},2000)
											this.getVinhDanh(1);	
										}
										if(data.data.item.type==="SCOIN_CARD"){
											this.setState({scoinCard:true})
										}
										this.setState({code:false})
										
									}
									list.push(data.data.item.name);
									var pos=1;
									if(data.data.item.type==="SCOIN"){
										pos=9;
									}else{
										var id=_this.props.dataPick.data.id;
										pos = itemOfSpin.map(function(e) { return e.id; }).indexOf(id);
									}
									
									this.resetWheel();
									if(!isSpin && closeAuto){
										this.startSpin(pos+1);
									}	
									_this.setState({itemBonus: data.data.item, data_auto: list, closeAuto:true});
								}else if(data.status ==="04"){
									$('#myModal13').modal('show');
								}else if(data.status ==="07"){
										this.setState({message_status:"Sự kiện chưa diễn ra hoặc đã kết thúc."},()=>{
										$('#myModal8').modal('show');
									})
								}else if(data.status ==="10"){
									this.setState({message_status:"Bạn cần xác nhận số ĐT để chơi.", xacthuc:true},()=>{
										$('#myModal8').modal('show');
									})
								}else{
									$('#myModal11').modal('show');
									this.setState({message_error:'Vòng quay đang có lỗi. Vui lòng tải lại trang.'})
								}
							}else{
								$('#myModal12').modal('show');
								this.setState({server_err:true})
							}
						})
						
					}else{
						$('#myModal6').modal('show');
					}
				}else{
					$('#myModal13').modal('show');
				}
			// } else {
			// 	$('#myModal5').modal('show');
			// }
		// }
		
	}

	btnStart=()=>{
		const {wheelSpinning}=this.state;
		if(!wheelSpinning){
			this.setState({data_auto:[], closeAuto:true},()=>{
				this.start();
			})
		}	
	}

	startSpin=(segmentNumber)=>{
		const {wheelSpinning, wheelPower, theWheel}=this.state;
		if (wheelSpinning == false) {
			let stopAt = theWheel.getRandomForSegment(segmentNumber);
			theWheel.animation.stopAngle = stopAt;
			theWheel.startAnimation();
			this.setState({wheelSpinning: true, stop:false});
		}
	}
	
	// stopSpin=()=>{
	// 	const {wheelSpinning, wheelPower, theWheel, stop}=this.state;
	// 	if (stop == false) {

	// 		theWheel.stopAnimation(false);
	// 		theWheel.animation.spins = 1;
	// 		theWheel.rotationAngle = 0;
	// 		theWheel.draw(); 
	// 		theWheel.startAnimation();
	// 		// theWheel.stopAnimation(false);
	// 		this.setState({wheelSpinning: true, stop:true});
	// 	}
	// }

	resetWheel=()=>{
		const { theWheel}=this.state;
		theWheel.stopAnimation(false);
		theWheel.animation.spins = 10; 
		theWheel.rotationAngle = 0;   
		theWheel.draw();              
		this.setState({wheelSpinning: false});    
	}

	completeRotation=()=>{
		const {auto, turnsFree, theWheel, itemBonus}=this.state;
		if(auto){
			var intervalId = setInterval(this.autoRotation, 2000);
			$('#myModal9').modal('show');
   			this.setState({intervalId: intervalId, isSpin: true, closeAuto:false, wheelSpinning: false});
			
		}else{
			if(itemBonus.type!=="ACTION"){
				$('#myModal4').modal('show');
			}
			this.setState({isSpin: false, closeAuto:true, wheelSpinning: false});
			this.getDetailData()
		}
	}

	handleChange = () => {
		this.setState({ auto : !this.state.auto});
	};


	autoRotation=()=>{
		const {turnsFree, luckySpin}=this.state;
		if(turnsFree>0){
			this.getDetailData();
		}else{
			clearInterval(this.state.intervalId);
		}
	}


	getDetailData=()=>{
		const {auto}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.getRotationDetailDataUser(user.access_token, 119).then(()=>{
			var data=this.props.dataRotationWithUser;
			if(data!==undefined){
				var turnsFree=data.data.userTurnSpin.turnsFree+data.data.userTurnSpin.turnsBuy;
				if(data.status==='01'){
					if(turnsFree>0){
						if(auto){
							this.start();
						}
					}else{
						$('#myModal6').modal('show');
						clearInterval(this.state.intervalId);
					}
					this.setState({turnsFree:turnsFree})
				}else if(data.status ==="04"){
					$('#myModal13').modal('show');
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Lỗi hệ thống. Vui lòng thử lại.'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	// showPopup=()=>{
	// 	const {itemBonus, turnsFree}=this.state;

	// 	setTimeout(()=>{
	// 		$('#myModal4').modal('hide');
	// 		if(turnsFree>0){
	// 			this.start()
	// 		}
	// 	},2000)
	// 	if(itemBonus.keyName!=="matluot"){
	// 		$('#myModal4').modal('show');
	// 	}
	// }

	timeRemain=(times)=>{
		var _this=this;
		setInterval(()=>{
			var time=(times-Date.now())/1000;
			if(time>0){
				var day=Math.floor(time/86400) > 9 ? Math.floor(time/86400) : `0${Math.floor(time/86400)}`;
				var hour=Math.floor((time%86400)/3600) > 9 ? Math.floor((time%86400)/3600) : `0${Math.floor((time%86400)/3600)}`;
				var minute=Math.floor(((time%86400)%3600)/60) > 9 ? Math.floor(((time%86400)%3600)/60) : `0${Math.floor(((time%86400)%3600)/60)}`;
				var second=Math.ceil(((time%86400)%3600)%60) > 9 ? Math.ceil(((time%86400)%3600)%60) : `0${Math.ceil(((time%86400)%3600)%60)}`;
				_this.setState({day:day, hour: hour, minute: minute, second:second})
				// _this.setState({hour_live: hour, minute_live: minute, second_live:second})
			}
		}, 1000);
	}

	timeShowLive=(times)=>{
		var now=Date.now();
		var _this=this;
		if(now>times){
			this.setState({isLive:true},()=>{
				setInterval(()=>{
					var time=(times-Date.now())/1000;
					if(time>0){
						var day=Math.floor(time/86400) > 9 ? Math.floor(time/86400) : `0${Math.floor(time/86400)}`;
						var hour=Math.floor((time%86400)/3600) > 9 ? Math.floor((time%86400)/3600) : `0${Math.floor((time%86400)/3600)}`;
						var minute=Math.floor(((time%86400)%3600)/60) > 9 ? Math.floor(((time%86400)%3600)/60) : `0${Math.floor(((time%86400)%3600)/60)}`;
						var second=Math.ceil(((time%86400)%3600)%60) > 9 ? Math.ceil(((time%86400)%3600)%60) : `0${Math.ceil(((time%86400)%3600)%60)}`;
						_this.setState({hour_live: hour, minute_live: minute, second_live:second})
					}
				}, 1000);
			});
		}
	}



	showModalBonus=()=>{
		$('#myModal').modal('show'); 
	}

	hideModalBonus=()=>{
		$('#myModal').modal('hide');
	}

	showModalRules=()=>{
		$('#myModal1').modal('show'); 
	}

	hideModalRules=()=>{
		$('#myModal1').modal('hide');
	}

	showModalTuDo=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.getDataTuDo(user);
			$('#myModal4').modal('hide');
			$('#myModal2').modal('show');
		}else {
			$('#myModal5').modal('show');
		}
	}

	getDataTuDo=(user)=>{
		const {luckySpin, limit, activeTuDo}=this.state;
		// var offsetTuDo=(pageNumber-1)*limit;
		this.props.getTuDo(user.access_token, luckySpin.id, limit, (activeTuDo-1)).then(()=>{
			var data=this.props.dataTuDo;
			if(data!==undefined){
				if(data.status==='01'){
					this.setState({listTuDo:data.data, countTuDo:data.totalRecords, noti_tudo:false})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	getHistory=(user)=>{
		const {luckySpin, limit, activeHistory}=this.state;
		// var offsetTuDo=(pageNumber-1)*limit;
		this.props.getHistoryTuDo(user.access_token, luckySpin.id, limit, (activeHistory-1)).then(()=>{
			var data=this.props.dataHistoryTuDo;
			if(data!==undefined){
				if(data.status==='01'){
					this.setState({listHistory:data.data, countHistory:data.totalRecords})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	hideModalTuDo=()=>{
		$('#myModal2').modal('hide');
	}

	showModalCodeBonus=()=>{
		const {luckySpin, offsetCode, limit}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		if(user !== null){
			this.props.getCodeBonus(user.access_token, luckySpin.id, 'LUCKY_NUMBER').then(()=>{
				var data=this.props.dataCodeBonus;
				if(data!==undefined){
					if(data.status==='01'){
						this.setState({dataCodeBonus:data.data, countCodeBonus:data.data.length, listCodeBonus: data.data.slice(0,5), noti_mdt:false})
					}else{
						$('#myModal11').modal('show');
						this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
					}
				}else{
					$('#myModal12').modal('show');
					this.setState({server_err:true})
				}
			});
			$('#myModal4').modal('hide');
			$('#myModal3').modal('show');
		}else {
			$('#myModal5').modal('show');
		}
	}

	closePopupAuto=()=>{
		clearInterval(this.state.intervalId);
		this.setState({ isSpin:false, closeAuto:false});
		$('#myModal9').modal('hide');
	}

	hideModalCodeBonus=()=>{
		$('#myModal3').modal('hide');
	}

	showModalDetailBonus=()=>{
		$('#myModal4').modal('show');
	}

	hideModalDetailBonus=()=>{
		$('#myModal4').modal('hide');
	}
	closeServerErr=()=>{
		$('#myModal12').modal('hide');
	}

	closePopupFinish=()=>{
		$('#myModal13').modal('hide');
	}

	// hideModalCode=()=>{
	// 	$('#myModal7').modal('hide');
	// }


	handlePageChangeTuDo=(pageNumber)=> {
		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({activeTuDo: pageNumber},()=>{
			this.getDataTuDo(user, pageNumber)
		})
	}

	handlePageChangeHistory=(pageNumber)=> {
		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({activeHistory: pageNumber},()=>{
			this.getHistory(user, pageNumber)
		})
	}

	handlePageChangeCodeBonus=(pageNumber)=> {
		const {dataCodeBonus}=this.state;
		var newPosition=(pageNumber-1)*5
		this.setState({activeCodeBonus: pageNumber, listCodeBonus: dataCodeBonus.slice(newPosition, newPosition+5)});
	}

	handlePageChangeVinhDanh=(pageNumber)=> {
		this.setState({activeVinhDanh: pageNumber},()=>{
			this.getVinhDanh(pageNumber)
		})
		// const {dataVinhDanh}=this.state;
		// var newPosition=(pageNumber-1)*10
		// this.setState({activeVinhDanh: pageNumber, listVinhDanh: dataVinhDanh.slice(newPosition, newPosition+10)});
	}

	openTabNapScoin=(url)=> {
		window.open(url, '_blank').focus();
	}

	xacThuc=(url)=> {
		localStorage.removeItem("user");
		document.location.reload(true);
		$('#myModal8').modal('hide');
		window.open(url, '_blank').focus();
	}

	findCode=(evt)=>{
		var value=evt.target.value
		// this.setState({
		// 	inputValue: evt.target.value
		//   });
		const {dataCodeBonus}=this.state;
		var data=dataCodeBonus.filter(v=>v.description.indexOf(value)!==-1)
		this.setState({countCodeBonus:data.length, listCodeBonus:data.slice(0,5)})
	}

	showPopupLiveStream=()=>{
		var time=(1572868800000-Date.now())/1000;
		if(time>0){
			$('#myModal13').modal('show');
		}else{
			$('#myModal14').modal('show');
		}
	}

	randomItemIndex=()=>{
		// var item = items[Math.floor(Math.random()*items.length)];
	}

	render() {
		const {xacthuc, scoinCard,height, width, dialogLoginOpen, dialogBonus, auto, dialogWarning, textWarning, isLogin, userTurnSpin, day, hour, minute, second, code,numberPage, img_status, message_status, data_auto,message_error,linkLiveStream,
			 activeTuDo, activeHistory, activeCodeBonus, activeVinhDanh, limit, countCodeBonus, countTuDo, countHistory, countVinhDanh, listHistory, listCodeBonus, listTuDo, listVinhDanh,itemBonus, turnsFree, noti_mdt, noti_tudo, finished, hour_live, minute_live, second_live, isLive, user}=this.state;
		const { classes } = this.props;
		const notification_mdt=noti_mdt?(<span className="badge badge-pill badge-danger position-absolute noti-mdt">!</span>):(<span></span>);
		const notification_tudo=noti_tudo?(<span className="badge badge-pill badge-danger position-absolute noti-tudo">!</span>):(<span></span>);
		return (<div>
			<a href="#logo" id="button"><img src={backtotop} alt="Back to Top" width="16" /></a>
			<div class="container py-3" style={{marginTop:55}}>
				<div class="row">
					<div class="col-sm-9 px-2">
						<div class="bg-white p-3 mb-3">
							<div class="row">
								<div class="col-12 my-2 px-3">                    	
									<div class="thumb-lat-the position-relative">
										<div class="alert alert-info fade show marquee small bg-transparent py-2 bg-badge-opacity-2">
												<p class="marquee_inner p-0 m-0"><img src={hot} width="48"/>Chúc mừng <strong>Huyen My</strong> đã nhận được 5k Scoin <img src={hot} width="48"/></p>
										</div>
										<div className="vqmm">
											<canvas id="canvas" width={width} height={height} data-responsiveMinWidth="180"  data-responsiveScaleHeight="true">		
											</canvas>
										</div>
									</div>
									<div class="btn-group btn-block">
									<button type="button" class="btn btn-light font13 py-2"><img src={icon_ticket} width="24" class="py-2" /> <br />Còn <span class="font-weight-bold text-warning">10</span> lượt chơi</button>
									<button type="button" class="btn btn-light font13 py-2 mx-1" data-toggle="modal" data-target="#myModal"><img src={icon_gift_box} width="24" class="py-2" /><br />Xem  phần thưởng</button>
									<button type="button" class="btn btn-light font13 py-2 mr-1" data-toggle="modal" data-target="#myModal1"><img src={icon_add} width="24" class="py-2" /> <br />Mua Lượt  ngay</button>
									<button type="button" class="btn btn-light font13 py-2"><img src={icon_history} width="24" class="py-2" /> <br />Xem  lịch sử</button>
									</div>
									<div class="card mt-2">
									<div class="card-body font13">
										<ul class="list-unstyled mb-0">
											<li>- Nhấn <span class="h6 font-weight-bold">"Chơi"</span> để bắt đầu</li>
											<li>- Sau đó các phần thưởng sẽ được úp xuống</li>
										</ul>
									</div>
									</div>                    
								</div>
								<div class="btn-group btn-block m-3">
								<button type="button" class="btn shadow-sm border btn-hover border-right-0 text-uppercase text-white py-2" onClick={this.btnStart}><span class="small">Chơi x 1</span></button>
								<button type="button" class="btn shadow-sm border btn-hover border-left-0 text-uppercase text-white py-2" onClick={this.btnStart}><span class="small">Chơi x 10</span></button>
								</div>                      
							</div>
						</div>
					</div>
					<div class="col-sm-3 px-2">
						<div class="bg-white p-3">
							<h2 class="font13 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Game thủ may mắn</span></h2>
							<div class="list-newest">
								<ul>
									<li class="py-2"><img src={logo_scoin} width="32" /><span class="text-muted px-2">Long Phi - </span>Thẻ 50k <span class="new">New</span></li>
									<li class="py-2"><img src={logo_scoin} width="32" /><span class="text-muted px-2">Huyền My - </span>Thẻ 10k <span class="new">New</span></li>
									<li class="py-2"><img src={logo_scoin} width="32" /><span class="text-muted px-2">fb_356safh... - </span>Thẻ 20k <span class="new">New</span></li>
									<li class="py-2"><img src={logo_scoin} width="32" /><span class="text-muted px-2">Spider man - </span>Thẻ 30k </li>
									<li class="py-2"><img src={logo_scoin} width="32" /><span class="text-muted px-2">Ngọc Trinh - </span>Thẻ 10k </li>
									<li class="py-2"><img src={logo_scoin} width="32" /><span class="text-muted px-2">Chim sẻ đi nắng - </span>Thẻ 5k </li>
								</ul>
							</div>
							
						</div>
					</div>
				</div>   
			</div>
			

			{/* The Modal Phần thưởng */}
			<div className="modal fade" id="myModal">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_phanthuong} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div class="modal-body w-100 giaithuong-pc">
						<img src={img_giaithuong_1} class="w-100" />
						<img src={img_giaithuong_2} class="w-100" />
					</div>
					<div class="modal-body w-100 giaithuong-mobile">
						<img src={img_giaithuong_1m} class="w-100" />
						<img src={img_giaithuong_2m} class="w-100" />
					</div>
					</div>
				</div>
			</div>

			{/* The Modal Thể lệ */}
			<div className="modal fade" id="myModal1">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thele} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div class="modal-body">
						<h3 class="text-red">I. Đối tượng tham gia</h3>
						<p class="text-thele pl-3"> &bull; Khách hàng có tài khoản Scoin. Nếu chưa có, đăng ký <code><a class="text-primary" href="https://scoin.vn/" title="Đăng ký" target="_blank">tại đây</a></code>. <br />
						&bull; Khách hàng cần xác thực số ĐT tại đây nếu chưa thực hiện <code><a class="text-primary" href="https://scoin.vn/cap-nhat-sdt" title="Xác Thực" target="_blank">tại đây</a></code>. <br />
						{/* &bull; Nạp game dùng thẻ Scoin mệnh giá tối thiểu 50k trong thời gian từ 0h 28/10 - 23:59 03/11. */}
						<code class="h5">&bull; Dùng thẻ Scoin nạp trực tiếp vào game</code> trong thời gian từ 0h 28/10 - 23:59 03/11 để được tặng lượt chơi</p>
						<h3 class="text-red">II. Cách thức tham gia sự kiện</h3>
						<div class="row">
						<div class="col-4 bg-orange py-2 text-center border border-white rounded-lg"><button type="button" class="btn btn-primary d-block mx-auto mb-3">Bước 1</button><p class="text-dark">Nạp game(thẻ Scoin)</p> <p class="font-weight-bold text-success my-1">&nabla;</p> <p class="text-dark">Nhận lượt chơi</p></div> 
						<div class="col-4 bg-orange py-2 text-center border border-white rounded-lg"><button type="button" class="btn btn-info d-block mx-auto mb-3">Bước 2</button><p class="text-dark">Chơi vòng quay </p> <p class="font-weight-bold text-success my-1">&nabla;</p> <p class="text-dark">Nhận mã dự thưởng</p></div> 
						<div class="col-4 bg-orange py-2 text-center border border-white rounded-lg"><button type="button" class="btn btn-success d-block mx-auto mb-3">Bước 3</button><p class="text-dark">So KQ Mã dự thưởng <br /> 19:00 04/11</p></div> 
						</div>
						<p class="text-thele pt-3 pl-3">  &bull; Bước 1:  Nạp game bất kỳ, <code class="h5">chọn thẻ cào> thẻ Scoin mệnh giá tối thiểu 50k.</code> <br />
						&bull; Bước 2: Nhận lượt quay miễn phí, tương ứng với thẻ Scoin nạp thành công:</p>
						<div class="table-responsive">
						<table class="table table-bordered text-center text-thele">
							<thead>
								<tr>
									<th colspan="4">Nạp thẻ Scoin vào game</th> 
								</tr>
								<tr>
									<th>STT</th>
									<th>Mệnh giá thẻ Scoin (VNĐ)</th>
									<th>Số lượt quay chuẩn</th>
									<th>Số lượt quay (đã cộng)</th>
								</tr>
							</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>50.000</td>
								<td>1</td>
								<td></td>
							</tr>
							<tr>
								<td>2</td>
								<td>100.000</td>
								<td>2</td>
								<td></td>
							</tr>
							<tr>
								<td>3</td>
								<td>200.000</td>
								<td>4</td>
								<td></td>
							</tr>
							<tr>
								<td>4</td>
								<td>300.000</td>
								<td>6</td>
								<td></td>
							</tr>
							<tr>
								<td>5</td>
								<td>500.000</td>
								<td>10</td>
								<td></td>
							</tr>
							<tr>
								<td>6</td>
								<td>1.000.000</td>
								<td>22</td>
								<td>10%</td>
							</tr>
							<tr>
								<td>7</td>
								<td>2.000.000</td>
								<td>44</td>
								<td>10%</td>
							</tr>
							<tr>
								<td>8</td>
								<td>5.000.000</td>
								<td>120</td>
								<td>20%</td>
							</tr>
						</tbody>
						</table>
						</div>
						<p class="text-thele pt-3 pl-3"> &bull; Bước 3: Chơi vòng quay tại link: <a style={{color:'#0066ff', textDecoration:'underline'}}>www.vongquayt10.splay.vn</a> để nhận Mã dự thưởng (Cần đăng nhập bằng tài khoản Scoin để chơi). <br></br>
						&bull; Bước 4: Mã dự thưởng dùng để đối chiếu với KQ Mã dự thưởng ngày 04/11/2019 để xác định trúng thưởng: <strong>1 điện thoại iPhone 11 Pro Max 256GB</strong></p>
						<h3 class="text-red">III. Các giải thưởng</h3>
						<p class="text-thele pl-3"> &bull; Scoin sẽ được cộng trực tiếp vào ví Scoin của khách hàng.<br></br>
						&bull; Thẻ Scoin: sẽ được lưu trữ trong Tủ đồ sự kiện. Khách hàng có thể xem và sử dụng trực tiếp để nạp điện thoại hoặc nạp vào các game của VTC Mobile.<br></br>
						&bull; Mã dự thưởng: lưu trữ trong mục Mã dự thưởng. Khách hàng có thể tra cứu dễ dàng.<br></br>
						&bull; Giải đặc biệt - iPhone 11 Pro Max: Sau khi KQ Mã dự thưởng ngày 04/11/2019 được công bố, BTC sẽ cập nhật thông tin của khách hàng trúng thưởng trong Bảng vinh danh. Khách hàng trúng giải liên hệ Hotline 1900 1104 để được hướng dẫn nhận thưởng.
						</p>

						<h3 class="text-red">IV. Thời gian trao thưởng</h3>
						<p class="text-thele pl-3"> &bull; Công ty cổ phần VTC Dịch vụ di động sẽ trao giải thưởng cho khách hàng chậm nhất sau 15 ngày làm việc kể từ khi kết thúc sự kiện.</p>
						<p class="text-thele pl-3"><code>Lưu ý:</code> <br />&bull; Khi đến nhận giải thưởng, khách hàng cần đem theo giấy tờ tùy thân (CMND/ CCCD/ Hộ chiếu còn hiệu lực. Theo khoản 6, điều 3, chương 1 của Luật thuế thu nhập cá nhân, những người may mắn trúng giải thưởng hiện vật có giá trị kinh tế cao có nghĩa vụ nộp thuế theo quy định của Nhà nước. Thông tin chi tiết xem <code><a class="text-primary" href="https://www.mof.gov.vn/webcenter/portal/mttpltc/r/m/pchtrphlu/pchtrthtu/pchtrthtu_chitiet?dDocName=BTC260955&dID=31536&_afrLoop=73261410332298795#!%40%40%3F_afrLoop%3D73261410332298795%26centerWidth%3D100%2525%26dDocName%3DBTC260955%26dID%3D31536%26leftWidth%3D0%2525%26rightWidth%3D0%2525%26showFooter%3Dfalse%26showHeader%3Dfalse%26_adf.ctrl-state%3D1a8d3rpn02_4" title="tại đây" target="_blank">tại đây</a></code>.<br></br>
						&bull; Trong tất cả các trường hợp, quyết định của Công ty cổ phần VTC Dịch vụ di động là quyết định cuối cùng. Mọi trường hợp gian lận hoặc không trung thực sẽ bị xử lý theo pháp luật.


						</p>

						</div>

					</div>
				</div>
			</div>


			{/* The Modal Tủ đồ */}
			<div className="modal fade" id="myModal2" style={{zIndex:10001}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_tudo} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<ul class="nav nav-pills nav-justified w-50 mx-auto">
							<li class="nav-item">
								<a class="nav-link active text-red" data-toggle="pill" href="#phanthuong" onClick={()=>this.getDataTuDo(user)}>Phần thưởng</a>
							</li>
							<li class="nav-item">
								<a class="nav-link text-red" data-toggle="pill" href="#lichsu" onClick={()=>this.getHistory(user)}>Lịch sử</a>
							</li>
						</ul>
						<div class="tab-content">        
							<div class="tab-pane container active" id="phanthuong">
								<div class="table-responsive mt-2">
									<table class="table table-bordered mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
										<thead>
										<tr class="text-uppercase lead">
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">Phần thưởng</th>
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">Nội dung</th>
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">Thời gian trúng</th>
										</tr>
										</thead>            
										<tbody class="popup-tudo">
											{listTuDo.map((obj, key) => (
												<tr key={key}>
													<td className="border-right-0">{obj.itemName}</td>
													<td className="border-left-0 border-right-0">{obj.description}</td>
													<td className="border-left-0">{obj.date}</td>
												</tr>
											))}
										</tbody>
									</table>
									<div className="pagination justify-content-center pag-custom">
										<Pagination
											activePage={activeTuDo}
											itemsCountPerPage={limit}
											totalItemsCount={countTuDo}
											pageRangeDisplayed={numberPage}
											lastPageText={'Trang cuối'}
											firstPageText={'Trang đầu'}
											itemClass={"page-item"}
											linkClass={"page-link"}
											onChange={(v) => this.handlePageChangeTuDo(v)}
										/>
									</div> 
								</div>
							</div>
							<div class="tab-pane container fade" id="lichsu">
								<div class="table-responsive mt-2">
									<table class="table table-bordered mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
										<thead>
										<tr class="text-uppercase lead">
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">STT</th>
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">Kết Quả</th>
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">Thời Gian</th>
										</tr>
										</thead>            
										<tbody class="popup-tudo">
											{listHistory.map((obj, key) => (
												<tr key={key}>
													<td className="border-right-0">{obj.stt}</td>
													<td className="border-left-0 border-right-0">{obj.item_name}</td>
													<td className="border-left-0">{obj.date}</td>
												</tr>
											))}
										</tbody>
									</table>
									<div className="pagination justify-content-center pag-custom">
										<Pagination
											activePage={activeHistory}
											itemsCountPerPage={limit}
											totalItemsCount={countHistory}
											pageRangeDisplayed={numberPage}
											lastPageText={'Trang cuối'}
											firstPageText={'Trang đầu'}
											itemClass={"page-item"}
											linkClass={"page-link"}
											onChange={(v) => this.handlePageChangeHistory(v)}
										/>
									</div> 
								</div>
							</div>
							
						</div>
						
					</div>

					</div>
				</div>
			</div>


			{/* The Modal Mã dự thưởng */}
			<div className="modal fade" id="myModal3" style={{zIndex:10002}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_maduthuong} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">Tìm kiếm</span>
								</div>
								<input type="text" className="form-control" placeholder="Nhập mã dự thưởng" onChange={e => this.findCode(e)}/>
							</div>
							<table className="table table-bordered mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
								<thead>
								<tr className="text-uppercase lead">
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Mã</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Nội dung</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Thời gian trúng</th>
								</tr>
								</thead>            
								<tbody className="popup-tudo">
								{listCodeBonus.map((obj, key) => (
									<tr key={key}>
										<td className="border-right-0">{obj.description}</td>
										<td className="border-left-0 border-right-0">{obj.itemName}</td>
										<td className="border-left-0">{obj.date}</td>
									</tr>
								))}
								</tbody>
							</table>
							<div className="pagination justify-content-center pag-custom">
								<Pagination
									activePage={activeCodeBonus}
									itemsCountPerPage={5}
									totalItemsCount={countCodeBonus}
									pageRangeDisplayed={numberPage}
									lastPageText={'Trang cuối'}
									firstPageText={'Trang đầu'}
									itemClass={"page-item"}
									linkClass={"page-link"}
									onChange={(v) => this.handlePageChangeCodeBonus(v)}
								/>
							</div> 
							<p className="text-thele">Lưu ý: Tài khoản Scoin của quý khách cần phải xác thực số ĐT để nhận thông báo trong trường hợp trúng giải. <code><a style={{fontSize:18}} href=" https://scoin.vn/doi-sdt" title="Xác thực ngay" target="_blank">Xác thực ngay</a></code> </p>
						</div>
						
					</div>

					</div>
				</div>
			</div>

			{/* The Modal Thông báo chúc mừng */}
			<div className="modal" id="myModal4">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

					{/* <!-- Modal body --> */}
						<div className="modal-body bg-chucmung justify-content-center">
							<div className="card">
								<div className="card-body content-chucmung mx-auto">
									{(code)?(
									<div>
										<div className="text-chucmung text-center" style={{marginTop:70}}>
											<span className="text-white">Bạn vừa quay vào ô</span>
											<span className="pt-1 d-block">Mã số dự thưởng iPhone 11 Pro Max 256GB đã được lưu trong Mã dự thưởng.</span>
											{/* <span className="pt-1 d-block">Bạn vừa nhận được Mã số dự thưởng giải hiện vật <span style={{fontWeight:'bold'}}>iPhone 11 Pro Max 256GB</span></span> */}
										</div>
										{/* <p style={{textAlign:'center', fontSize:30, fontWeight:'bold'}}>{itemBonus.value}</p> */}
									
										<p className="small pt-2 mb-2 text-center">So KQ Mã số dự thưởng vào lúc 19:00 ngày 04/11/2019.<br /><label title="Xem phần thưởng" className="underline pt-2 d-block" style={{color:"#fff", cursor:'pointer'}} onClick={this.showModalCodeBonus}>Xem phần thưởng</label></p>
										<button type="button" className="btn btn-xacnhan text-white btn-block text-center" onClick={this.hideModalDetailBonus}>Xác nhận</button>
									</div>
									):(
									<div>
										{(scoinCard)?(<div><div className="text-chucmung text-center" style={{marginTop:70}}>
											<span>Bạn vừa quay vào ô <span style={{color:'red'}}>thẻ Scoin {itemBonus.value}VND</span></span>
										</div>
										<p className="small pt-2 mb-2 text-center">(Phần thưởng đã được chuyển vào Tủ đồ sự kiện) <br /><label title="Xem phần thưởng" className="underline pt-2 d-block" style={{color:"#fff", cursor:'pointer'}} onClick={this.showModalTuDo}>Xem phần thưởng</label></p></div>):(
											<div>
											<div className="text-chucmung text-center" style={{marginTop:70}}>
											<span>Bạn vừa nhận được <span style={{color:'red'}}>{itemBonus.value} Scoin</span></span>
										</div>
										<p className="small pt-2 mb-2 text-center">(Phần thưởng đã được cộng vào ví Scoin)</p>
										</div>
										)}
									
										<button type="button" className="btn btn-xacnhan text-white btn-block text-center" onClick={this.hideModalDetailBonus}>Xác nhận</button>
									</div>
									)}	
									


								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo đăng nhập--> */}
			<div className="modal fade" id="myModal5">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">Xin vui lòng đăng nhập!</h5>
							<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={this.loginAction}>Đăng nhập</button>
						</div>       
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo đăng nhập--> */}
			<div className="modal fade" id="myModal6" style={{zIndex:10002}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">Bạn đã hết lượt quay!</h5>
							<p className="text-thele lead text-center">Hãy nạp Scoin để nhận thêm lượt chơi Vòng quay tháng 10.</p>
							<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={()=>this.openTabNapScoin('https://scoin.vn/nap-game')}>Nạp Game</button>
							{/* <button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={()=>this.openTabNapScoin('http://sandbox.scoin.vn/nap-vao-game?GameId=330287')}>Nạp Game</button> */}
						</div>       
					</div>

					</div>
				</div>
			</div>

			<div className="modal fade" id="myModal8">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">{message_status}</h5>
							{(xacthuc)?(<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={()=>this.xacThuc('https://scoin.vn/cap-nhat-sdt')}>Xác Thực</button>):(<div></div>)}
							
						</div>       
					</div>

					</div>
				</div>
			</div>


			<div className="modal fade" id="myModal9" data-keyboard="false" data-backdrop="static" style={{zIndex:10000}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button className="close" onClick={this.closePopupAuto}><img src={btn_close} alt="Đóng" /></button>
					</div>

					<div className="modal-body">
						<div className="table-responsive mt-2">
							<h3 className="text-purple text-center">Kết quả quay tự động</h3>
							<ol className="list-group list-group-flush">
								{data_auto.map((obj, key) => (
									<li className="list-group-item" key={key}>{key+1}. {obj}</li>
								))}
							</ol> 
							
							<p className="text-thele">Vào <code><label onClick={this.showModalTuDo}>Tủ đồ</label></code> hoặc <code><label onClick={this.showModalCodeBonus}>Mã dự thưởng</label></code> để xem chi tiết.</p>
							<p className="text-thele text-center"><code>Đang quay tự động <span className="spinner-grow spinner-grow-sm"></span></code></p>
						</div>
						
					</div>

					</div>
				</div>
			</div>

			<div className="modal fade" id="myModal10">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>
					<div className="modal-body">
						<div className="table-responsive mt-2">
							<h5 class="text-center">Bạn sẽ nhận được lượt chơi miễn phí khi nạp thẻ Scoin vào game của VTC Mobile.</h5>
							<table className="table table-striped mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
								<thead>
									<tr>
										<th colspan="4">Nạp thẻ Scoin vào game</th>                    
									</tr>
									<tr>
										<th>STT</th>
										<th>Mệnh giá thẻ Scoin (VNĐ)</th>
										<th>Số lượt quay chuẩn</th>
										<th>Số lượt quay (đã cộng)</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>1</td>
										<td>50.000</td>
										<td>1</td>
										<td></td>
									</tr>
									<tr>
										<td>2</td>
										<td>100.000</td>
										<td>2</td>
										<td></td>
									</tr>
									<tr>
										<td>3</td>
										<td>200.000</td>
										<td>4</td>
										<td></td>
									</tr>
									<tr>
										<td>4</td>
										<td>300.000</td>
										<td>6</td>
										<td></td>
									</tr>
									<tr>
										<td>5</td>
										<td>500.000</td>
										<td>10</td>
										<td></td>
									</tr>
									<tr>
										<td>6</td>
										<td>1.000.000</td>
										<td>22</td>
										<td>10%</td>
									</tr>
									<tr>
										<td>7</td>
										<td>2.000.000</td>
										<td>44</td>
										<td>10%</td>
									</tr>
									<tr>
										<td>8</td>
										<td>5.000.000</td>
										<td>120</td>
										<td>20%</td>
									</tr>
								</tbody>
							</table> 
							<div class="btn-logout position-relative w-25 mx-auto text-center left-0 top-0">
								<h5 class="text-center" onClick={()=>this.openTabNapScoin('https://scoin.vn/nap-game')}><a>Nạp</a></h5>
								{/* <h5 class="text-center" onClick={()=>this.openTabNapScoin('http://sandbox.scoin.vn/nap-vao-game?GameId=330287')}><a>Nạp</a></h5> */}
							</div>             
							{/* <button type="button" className="btn btn-xacnhan text-white btn-block text-center" onClick={()=>this.openTabNapScoin('https://scoin.vn/nap-game')}>Nạp</button> */}
						</div>
						
					</div>

					</div>
				</div>
				</div>

				<div className="modal fade" id="myModal11">
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">

						{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

						{/* <!-- Modal body --> */}
						<div className="modal-body">
							<div className="table-responsive mt-2">              
								<h5 className="text-thele lead text-center">{message_error}</h5>
							</div>       
						</div>

						</div>
					</div>
				</div>
				<div className="modal fade" id="myModal12">
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">

						{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

						{/* <!-- Modal body --> */}
						<div className="modal-body">
							<div className="table-responsive mt-2">              
								<h5 className="text-thele lead text-center">Thông báo bảo trì!</h5>
								<h5 className="text-thele lead text-center">Hệ thống đang được nâng cấp để tối ưu. Vui lòng quay lại sau 10 phút.</h5>
								<h5 className="text-thele lead text-center">Xin lỗi vì sự bất tiện này</h5>
								<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={this.closeServerErr}>Xác nhận</button>
							</div>       
						</div>

						</div>
					</div>
				</div>

				<div className="modal fade" id="myModal13">
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">

						{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

						{/* <!-- Modal body --> */}
						<div className="modal-body">
							<div className="table-responsive mt-2"> 
								<h3 class="text-center text-red">Livestream chưa diễn ra.</h3>          
								<h5 className="text-thele lead text-center">Mời quay lại vào lúc 19:00 ngày 04/11/2019 để xem trực tiếp buổi so Mã dự thưởng trúng iPhone 11 Pro Max 256Gb</h5>
								<p class="text-center text-thele">Phát sóng trực tiếp tại trang sự kiện <a style={{color:'#0066ff', textDecoration:'underline'}}>https://vongquayt10.splay.vn</a></p>
								<p class="text-center text-thele">Và fanpage Scoin: <a href="https://www.facebook.com/scoinvtcmobile" title="Fanpage Scoin" target="_blank">https://www.facebook.com/scoinvtcmobile</a></p>
								<h5 className="text-thele lead text-center">BTC trân trọng thông báo.</h5>
								<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={this.closePopupFinish}>Xác nhận</button>
							</div>       
						</div>

						</div>
					</div>
				</div>

				<div className="modal fade" id="myModal14">
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">

						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_livestream} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

						<div className="modal-body">
								<div className="facebook-responsive">
									<iframe src='https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fscoinvtcmobile%2Fvideos%2F2534194866674538%2F&show_text=0&width=560' width="560" height="315" style={{border:'none', overflow:'hidden'}} scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>
								</div>     
						</div>

						</div>
					</div>
				</div>
				{/* <div class="modal fade" id="myModal8">
					<div class="modal-dialog">
						<div class="modal-content popup-phanthuong">
						<div class="modal-header border-bottom-0">
							<h4 class="modal-title w-100 text-center"><img src="images/img-thongbao.png" alt="" /></h4>
							<button type="button" class="close" data-dismiss="modal"><img src="images/btn-close.png" alt="Đóng" /></button>
						</div>
						<div class="modal-body">
								<div class="facebook-responsive">
									<iframe src={linkLiveStream} width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>                
								</div>
								<h3 class="text-center text-red">Livestream chưa diễn ra.</h3>
								<p class="text-center text-thele">Mời quay lại vào lúc 19:00 ngày 04/11/2019 để xem trực tiếp buổi so Mã dự thưởng trúng iPhone 11 Pro Max 256Gb</p>
								<p class="text-center text-thele">Phát sóng trực tiếp tại trang sự kiện <a href="https://vongquayt10.splay.vn" title="Vòng quay tháng 10">https://vongquayt10.splay.vn</a></p>
								<p class="text-center text-thele">Và fanpage Scoin: <a href="https://www.facebook.com/scoinvtcmobile" title="Fanpage Scoin" target="_blank">https://www.facebook.com/scoinvtcmobile</a></p>
								<button type="button" class="btn btn-xacnhan text-white btn-block text-center py-4">Xác nhận</button>   
						</div>

						</div>
					</div>
				</div> */}
				<ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onResize} />


		</div>)
	}
}

const mapStateToProps = state => ({
	dataProfile: state.profile.data,
	dataRotation:state.lucky.dataRotation,
	dataRotationWithUser:state.lucky.dataRotationWithUser,
	dataPick: state.lucky.dataPick,
	dataDetail: state.lucky.dataDetail,
	dataTurn: state.lucky.dataTurn,
	dataTuDo: state.lucky.dataTuDo,
	dataHistoryTuDo: state.lucky.dataHistoryTuDo,
	dataVinhDanh: state.lucky.dataVinhDanh,
	dataCodeBonus: state.lucky.dataCodeBonus,
	server:state.server.serverError,
	waiting: state.lucky.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn,
	getHistoryTuDo,
	getData,
	getTuDo,
	getCodeBonus,
	getVinhDanh,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_Rotation)