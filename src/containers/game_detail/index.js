import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getAllGame,
	getDataId,
	getData,
	rating,
	getDataBXH,
	getDataRanking,
	awards
} from '../../modules/game'
import {
	getDataByGame
} from '../../modules/giftcode'
import {
	changeTitle
} from '../../modules/global'
import { getData as getArticleData } from '../../modules/article'
import { getData as getYoutubeData } from '../../modules/youtubeApi'
import {getMissionByGame} from '../../modules/mission';
import Ultilities from '../../Ultilities/global'

import GameDetailComponent from '../../components/page/GameDetail'
class Game_detail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dialogLoginOpen: false,
			dialogRatingOpen: false,
			pointSubmit: 0,
			showMore: false,
			message: "",
			snackVariant: "info",
			videoId:"",
			openSnack: false,
			lightBoxOpen: false,
			lightBoxIndex: 0,
			youtubeOpen: false,
			gameArticles: [],
			gameMoi:[],
			gameCare:[],
			gameData: {},
			users:[],
			data_bxh:{},
			data_ranking:[],
			endDateReceivedGift:0,
			id_game:330333,
			games:[],
			myPosition:0,
			isOpen:false,
			show_award:false,
			show_award_error:false,
			message_error:'',
			item_award:{},
			gameRanking:false,
			week:'WEEK_BEFORE_LAST',
			access_token:'',
			isLogin:false,
		};
	}

	componentWillMount(){
		
	}

	componentDidMount() {
		const {id_game}= this.state;
		this.getData(id_game)
	}

	getParamValue=(key)=>{
		var url = window.location.search.substring(1);
		var qArray = url.split('&');
		for (var i = 0; i < qArray.length; i++) 
		{
			var pArr = qArray[i].split('=');
			if (pArr[0] === key) 
				return pArr[1];
		}
	}


	getData=(id_game)=>{
		var _this = this;
		this.props.getAllGame().then(function () {
			var data=_this.props.allGame
			if(data.status==="01"){
				var games=data.data.filter(v=>v.scoinGameId!==+id_game)
				var news=games.sort((a,b) => (a.createOn < b.createOn) ? 1 : ((b.createOn < a.createOn) ? -1 : 0));
				var gameMoi=news.slice(0, 5)
				var care=games.sort((a,b) => (a.downloadTurns < b.downloadTurns) ? 1 : ((b.downloadTurns < a.downloadTurns) ? -1 : 0));
				// var gameCare=care.slice(0, 6)
				var gameCare=_this.random_item(games)
				_this.setState({gameMoi:gameMoi, gameCare:gameCare, games:games, showMore: false, id_game:id_game})
			}
		});
		this.props.getDataId(+id_game).then(function () {
			var data=_this.props.data
			if(data.status==="01"){
				_this.props.getYoutubeData(data.data.youtubeChannelId, data.data.youtubeDefaultSearch);
				_this.setState({ gameData: _this.props.data.data, gameRanking:data.data.gameRanking });
			}
		});
	}

	random_item=(items)=>{
		var result=[];
		var new_items=[];
		for (let i = 0; i < 6; i++) {
			const element = items[Math.floor(Math.random()*items.length)];
			result.push(element);
			items.splice(items.indexOf(element), 1);
		}
		return result;
	}

	readMore = () => {
		this.setState({ showMore: true });
	}

	compact=()=>{
		this.setState({ showMore: false });
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	}

	dialogLoginOpen = () => {
		this.setState({ dialogLoginOpen: true });
	};

	dialogLoginClose = () => {
		this.setState({ dialogLoginOpen: false });
	};

	dialogRatingOpen = () => {
		this.setState({ dialogRatingOpen: true });
	};

	dialogRatingClose = () => {
		this.setState({ dialogRatingOpen: false });
	};

	dialogYoutubeOpen = (videoId) => {
		this.setState({ youtubeOpen: true, videoId: videoId });
	};

	dialogYoutubeClose = () => {
		this.setState({ youtubeOpen: false });
	};

	changePointSubmit = (point) => {
		this.setState({ pointSubmit: point });
	}

	ratingAction = () => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.rating(this.props.match.params.id, this.state.pointSubmit, user.access_token).then(function () {
			if (_this.props.dataRating.statusCode === "T") {
				_this.setState({ openSnack: true, message: "Thành công", snackVariant: "success", dialogRatingOpen: false });
			} else {
				_this.setState({ openSnack: true, message: _this.props.dataRating.onlyMessage, snackVariant: "error", dialogRatingOpen: false });
			}
		});
	}

	openRatingDialog = () => {
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.dialogRatingOpen();
		} else {
			this.dialogLoginOpen();
		}
	}

	loginAction = () => {
		// window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&redirect_uri=${window.location.protocol}//${window.location.host}&action=login&agencyid=0`);
		// window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=58306439627cac03c8e4259a87e2e1ca&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)
	}

	closeLightBox = () => {
		this.setState({ lightBoxOpen: false });
	}

	openLightBox = (index) => {
		this.setState({ lightBoxOpen: true, lightBoxIndex: index });
	}



	goToLightBoxNext = () => {
		this.setState({ lightBoxIndex: this.state.lightBoxIndex + 1 });
	}
	goToLightBoxPrev = () => {
		this.setState({ lightBoxIndex: this.state.lightBoxIndex - 1 });
	}

	getWithWeekBXH=(weeked)=>{
		var user = JSON.parse(localStorage.getItem("user"));
		if(user!==null){
			this.setState({week:weeked},()=>{
				this.getDataBXH();
			})
		}else{
			this.loginAction()
		}
		// this.loginAction();
	
	}
	
	getDataBXH=()=>{
		var _this = this;
		const {id_game, week}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.getDataBXH(330333, week, user.access_token).then(function () {
			_this.setState({users: _this.props.data_bxh.data.users, data_bxh: _this.props.data_bxh.data, myPosition: _this.props.data_bxh.data.myPosition})
			// console.log(_this.props.data_bxh)
		});
	}

	getDataRanking=()=>{
		var _this = this;
		const {id_game}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.getDataRanking(330333, user.access_token).then(function () {
			_this.setState({data_ranking:_this.props.data_ranking.data.ranks, endDateReceivedGift: _this.props.data_ranking.data.endDateReceivedGift})
		});
	}

	awards=(item)=>{
		var _this = this;
		var type=item.itemType
		var new_item=item;
		var user = JSON.parse(localStorage.getItem("user"));
		const {id_game}=this.state;
		switch(type) {
			case 'TURN_LUCKYSPIN':
				new_item.consumable=true;
				new_item.show_value=item.quantity;
				break;
			case 'XU':
			case 'SCOIN':
				new_item.consumable=true;
				new_item.show_value=item.value;
			  	break;
			default:
				new_item.consumable=false;
				new_item.show_value=item.content;
		  }
		  console.log(new_item)
		if(item.received){
			this.setState({show_award:true, item_award:new_item});
		}else{
			this.props.awards(item.itemId, 330333, user.access_token).then(function () {
				const data=_this.props.data_awards;
				if(data.status==="01"){
					_this.setState({show_award:true, item_award:new_item})
					_this.getDataRanking();
				}else if(data.status==="04"){
					_this.setState({show_award_error:true, message_error:'Bạn đã nhận quà rồi.'})
				}else if(data.status==="05"){
					_this.setState({show_award_error:true, message_error:'Quà này không thuộc rank của bạn.'})
				}
				console.log(_this.props.data_awards)
				// _this.setState({data_ranking:_this.props.data_ranking.data.ranks, endDateReceivedGift: _this.props.data_ranking.data.endDateReceivedGift})
			});
		}
		
	}

	closeError=()=>{
		this.setState({show_award_error:false});
	}
	closeAward=()=>{
		delete this.state.item_award;
	}

	render() {
		
		return (
			<div>
				<GameDetailComponent
					goToLightBoxPrev={this.goToLightBoxPrev}
					goToLightBoxNext={this.goToLightBoxNext}
					openLightBox={this.openLightBox}
					closeLightBox={this.closeLightBox}
					openRatingDialog={this.openRatingDialog}
					ratingAction={this.ratingAction}
					changePointSubmit={this.changePointSubmit}
					dialogYoutubeClose={this.dialogYoutubeClose}
					dialogYoutubeOpen={this.dialogYoutubeOpen}
					dialogRatingClose={this.dialogRatingClose}
					dialogRatingOpen={this.dialogRatingOpen}
					dialogLoginClose={this.dialogLoginClose}
					dialogLoginOpen={this.dialogLoginOpen}
					handleCloseSnack={this.handleCloseSnack}
					readMore={this.readMore}
					compact={this.compact}
					getData={this.getData}
					getDataBXH={this.getDataBXH}
					getWithWeekBXH={this.getWithWeekBXH}
					getDataRanking={this.getDataRanking}
					awards={this.awards}
					closeError={this.closeError}
					closeAward={this.closeAward}
					show_award_error={this.state.show_award_error}
					show_award={this.state.show_award}
					message_error={this.state.message_error}
					item_award={this.state.item_award}

					data={this.props.data}
					users={this.state.users}
					myPosition={this.state.myPosition}
					data_bxh={this.state.data_bxh}
					data_ranking={this.state.data_ranking}
					gameRanking={this.state.gameRanking}
					endDateReceivedGift={this.state.endDateReceivedGift}
					server={this.props.server}
					dataMission={this.props.dataMission}
					dataGiftcode={this.props.dataGiftcode}
					youtubeData={this.props.youtubeData}
					youtubeWaiting={this.props.youtubeWaiting}
					dialogLoginOpen={this.state.dialogLoginOpen}
					dialogRatingOpen={this.state.dialogRatingOpen}
					pointSubmit={this.state.pointSubmit}
					showMore={this.state.showMore}
					videoId={this.state.videoId}
					message={this.state.message}
					snackVariant={this.state.snackVariant}
					openSnack={this.state.openSnack}
					lightBoxOpen={this.state.lightBoxOpen}
					lightBoxIndex={this.state.lightBoxIndex}
					youtubeOpen={this.state.youtubeOpen}
					gameArticles={this.state.gameArticles}
					gameData={this.state.gameData}
					gameMoi={this.state.gameMoi}
					gameCare={this.state.gameCare}
					week={this.state.week}
				/>

			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		data: state.game.dataDetail,
		data_bxh: state.game.data_bxh,
		data_ranking: state.game.data_ranking,
		data_awards:state.game.data_awards,
		allGame: state.game.allGame,
		dataRating: state.game.dataRating,
		dataMission: state.mission.dataMission,
		waiting: state.game.waiting,
		dataGiftcode: state.giftcode.data,
		articleData: state.article.data,
		articleWaiting: state.article.waiting,
		youtubeData: state.youtubeApi.data,
		youtubeWaiting: state.youtubeApi.waiting,
		server:state.server.serverError
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	getDataId,
	getData,
	rating,
	getDataByGame,
	changeTitle,
	getArticleData,
	getMissionByGame,
	getYoutubeData,
	getAllGame,
	getDataBXH,
	getDataRanking,
	awards,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game_detail)