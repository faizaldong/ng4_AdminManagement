import { Injectable } from '@angular/core'

@Injectable()
export class Json {

	planArr=[]

	planbasedonpaymenttype(apps, paymenttype){ //TO LISTING PLAN MONTHLY ONLY
		let data = apps.filter(function(v){ return v.plans.length>0})
		for(let i=0; i<data.length; i++){
				let plans = data[i].plans.filter(function(v){ return v.plan_frequency.name==paymenttype})
				data[i].plans=[]
				data[i].plans = plans
				data[i].paymenttype = paymenttype
				data[i].plans.map(o => o.selected = false)
		}
		return data
	}

	/*TAKE A DEEP BREATH TO UNDERSTAND THIS FUNCTION*/
	planbasedonpaymenttypechose(apps, updateapps, appname, paymenttype){ //TO LISTING BASED ON USER CHOSE EITHER MONTHLY OR ANUALLY
		let data = apps.filter(function(v){ return v.plans.length>0})

		for(let i=0; i<data.length; i++){
			let set = updateapps.filter(function(v){return v.application_registration.name==data[i].application_registration.name})
			if(appname&&data[i].application_registration.name==appname){ //CHANGE PLAN LISTING BASED ON APPLICATION [WMS,LDS,AUTH,COMBO] CHOSE
				let plans = data[i].plans.filter(function(v){ return v.plan_frequency.name==paymenttype}) //GET PLANS BASED ON CHOSE PAYMENT TYPE [MONTH/ANNUAL]
				data[i].plans=[]
				data[i].plans = plans
				data[i].paymenttype = paymenttype
				data[i].plans.map(o => o.selected = false)
			}else{ //KEEP OTHER APPLICATION PLAN LISTING
				if(set[0].application_registration.name==data[i].application_registration.name){ //CHECK APPLICATION NAME IS SAME
					let plans = data[i].plans.filter(function(v){ return v.plan_frequency.name==set[0].paymenttype}) //GET PLANS BASED ON EXIST PAYMENT TYPE [MONTH/ANNUAL]

					data[i].plans=[]
					data[i].plans = plans
					data[i].paymenttype = set[0].paymenttype
					
					$.each(set[0].plans, function(j,v){
						if(v.selected){
							let findindex = data[i].plans.findIndex(x => x.id==v.id)
							data[i].plans[findindex].selected=true
						}else{
							let findindex = data[i].plans.findIndex(x => x.id==v.id)
							data[i].plans[findindex].selected=false
						}
					})

				}
			}
		}
		return data
	}

	planselected(appsindex, apps, plan){
		let data = apps
		$.each(data, function(i,v){
			$.each(v.plans, function(j,k){
				if(k.id==plan.id){ v.plans[j].selected=true}else{v.plans[j].selected=false}
			})
		})
		return data
	}

	addplan(appplans, plan, checkstorage){
		this.planArr=[] //BEFORE THIS USER CAN HAVE MANY PLANS, BUT AS PER DISCUSSED USER CAN HAVE 1 PLAN ONLY. SO WHENEVER USER CLICK BUTTON `Add to Plan` I WILL SET planArr TO []. FOR CURRENT SCENARIO 'ELSE STATEMENT' WILL NOT BE EXECUTE
		if(checkstorage){
			plan.application_registration_id=appplans.application_registration.id
			plan.application_registration_details=appplans.application_registration
			if(this.planArr.length==0){
				this.planArr.push(plan)
			}else{
				let idindex = this.planArr.findIndex(x => x.application_registration_id==plan.application_registration_id)
				if(idindex==-1){
					this.planArr.push(plan)
				}else{
					this.planArr.splice(idindex, 1)
					this.planArr.push(plan)
				}
			}
		}else{//IF STORAGE EMPTY THEN SET planArr TO []
			this.planArr=[]
			plan.application_registration_id=appplans.application_registration.id
			plan.application_registration_details=appplans.application_registration
			if(this.planArr.length==0){
				this.planArr.push(plan)
			}else{
				let idindex = this.planArr.findIndex(x => x.application_registration_id==plan.application_registration_id)
				if(idindex==-1){
					this.planArr.push(plan)
				}else{
					this.planArr.splice(idindex, 1)
					this.planArr.push(plan)
				}
			}
		}
		return this.planArr
	}

}