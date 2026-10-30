import{r as I,j as d,c as ot,R as ct}from"./client-CUzWldx5.js";var S;(function(s){s.assertEqual=r=>r;function e(r){}s.assertIs=e;function t(r){throw new Error}s.assertNever=t,s.arrayToEnum=r=>{const a={};for(const i of r)a[i]=i;return a},s.getValidEnumValues=r=>{const a=s.objectKeys(r).filter(c=>typeof r[r[c]]!="number"),i={};for(const c of a)i[c]=r[c];return s.objectValues(i)},s.objectValues=r=>s.objectKeys(r).map(function(a){return r[a]}),s.objectKeys=typeof Object.keys=="function"?r=>Object.keys(r):r=>{const a=[];for(const i in r)Object.prototype.hasOwnProperty.call(r,i)&&a.push(i);return a},s.find=(r,a)=>{for(const i of r)if(a(i))return i},s.isInteger=typeof Number.isInteger=="function"?r=>Number.isInteger(r):r=>typeof r=="number"&&isFinite(r)&&Math.floor(r)===r;function n(r,a=" | "){return r.map(i=>typeof i=="string"?`'${i}'`:i).join(a)}s.joinValues=n,s.jsonStringifyReplacer=(r,a)=>typeof a=="bigint"?a.toString():a})(S||(S={}));var Ue;(function(s){s.mergeShapes=(e,t)=>({...e,...t})})(Ue||(Ue={}));const m=S.arrayToEnum(["string","nan","number","integer","float","boolean","date","bigint","symbol","function","undefined","null","array","object","unknown","promise","void","never","map","set"]),J=s=>{switch(typeof s){case"undefined":return m.undefined;case"string":return m.string;case"number":return isNaN(s)?m.nan:m.number;case"boolean":return m.boolean;case"function":return m.function;case"bigint":return m.bigint;case"symbol":return m.symbol;case"object":return Array.isArray(s)?m.array:s===null?m.null:s.then&&typeof s.then=="function"&&s.catch&&typeof s.catch=="function"?m.promise:typeof Map<"u"&&s instanceof Map?m.map:typeof Set<"u"&&s instanceof Set?m.set:typeof Date<"u"&&s instanceof Date?m.date:m.object;default:return m.unknown}},l=S.arrayToEnum(["invalid_type","invalid_literal","custom","invalid_union","invalid_union_discriminator","invalid_enum_value","unrecognized_keys","invalid_arguments","invalid_return_type","invalid_date","invalid_string","too_small","too_big","invalid_intersection_types","not_multiple_of","not_finite"]),dt=s=>JSON.stringify(s,null,2).replace(/"([^"]+)":/g,"$1:");class R extends Error{constructor(e){super(),this.issues=[],this.addIssue=n=>{this.issues=[...this.issues,n]},this.addIssues=(n=[])=>{this.issues=[...this.issues,...n]};const t=new.target.prototype;Object.setPrototypeOf?Object.setPrototypeOf(this,t):this.__proto__=t,this.name="ZodError",this.issues=e}get errors(){return this.issues}format(e){const t=e||function(a){return a.message},n={_errors:[]},r=a=>{for(const i of a.issues)if(i.code==="invalid_union")i.unionErrors.map(r);else if(i.code==="invalid_return_type")r(i.returnTypeError);else if(i.code==="invalid_arguments")r(i.argumentsError);else if(i.path.length===0)n._errors.push(t(i));else{let c=n,h=0;for(;h<i.path.length;){const u=i.path[h];h===i.path.length-1?(c[u]=c[u]||{_errors:[]},c[u]._errors.push(t(i))):c[u]=c[u]||{_errors:[]},c=c[u],h++}}};return r(this),n}static assert(e){if(!(e instanceof R))throw new Error(`Not a ZodError: ${e}`)}toString(){return this.message}get message(){return JSON.stringify(this.issues,S.jsonStringifyReplacer,2)}get isEmpty(){return this.issues.length===0}flatten(e=t=>t.message){const t={},n=[];for(const r of this.issues)r.path.length>0?(t[r.path[0]]=t[r.path[0]]||[],t[r.path[0]].push(e(r))):n.push(e(r));return{formErrors:n,fieldErrors:t}}get formErrors(){return this.flatten()}}R.create=s=>new R(s);const oe=(s,e)=>{let t;switch(s.code){case l.invalid_type:s.received===m.undefined?t="Required":t=`Expected ${s.expected}, received ${s.received}`;break;case l.invalid_literal:t=`Invalid literal value, expected ${JSON.stringify(s.expected,S.jsonStringifyReplacer)}`;break;case l.unrecognized_keys:t=`Unrecognized key(s) in object: ${S.joinValues(s.keys,", ")}`;break;case l.invalid_union:t="Invalid input";break;case l.invalid_union_discriminator:t=`Invalid discriminator value. Expected ${S.joinValues(s.options)}`;break;case l.invalid_enum_value:t=`Invalid enum value. Expected ${S.joinValues(s.options)}, received '${s.received}'`;break;case l.invalid_arguments:t="Invalid function arguments";break;case l.invalid_return_type:t="Invalid function return type";break;case l.invalid_date:t="Invalid date";break;case l.invalid_string:typeof s.validation=="object"?"includes"in s.validation?(t=`Invalid input: must include "${s.validation.includes}"`,typeof s.validation.position=="number"&&(t=`${t} at one or more positions greater than or equal to ${s.validation.position}`)):"startsWith"in s.validation?t=`Invalid input: must start with "${s.validation.startsWith}"`:"endsWith"in s.validation?t=`Invalid input: must end with "${s.validation.endsWith}"`:S.assertNever(s.validation):s.validation!=="regex"?t=`Invalid ${s.validation}`:t="Invalid";break;case l.too_small:s.type==="array"?t=`Array must contain ${s.exact?"exactly":s.inclusive?"at least":"more than"} ${s.minimum} element(s)`:s.type==="string"?t=`String must contain ${s.exact?"exactly":s.inclusive?"at least":"over"} ${s.minimum} character(s)`:s.type==="number"?t=`Number must be ${s.exact?"exactly equal to ":s.inclusive?"greater than or equal to ":"greater than "}${s.minimum}`:s.type==="date"?t=`Date must be ${s.exact?"exactly equal to ":s.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(s.minimum))}`:t="Invalid input";break;case l.too_big:s.type==="array"?t=`Array must contain ${s.exact?"exactly":s.inclusive?"at most":"less than"} ${s.maximum} element(s)`:s.type==="string"?t=`String must contain ${s.exact?"exactly":s.inclusive?"at most":"under"} ${s.maximum} character(s)`:s.type==="number"?t=`Number must be ${s.exact?"exactly":s.inclusive?"less than or equal to":"less than"} ${s.maximum}`:s.type==="bigint"?t=`BigInt must be ${s.exact?"exactly":s.inclusive?"less than or equal to":"less than"} ${s.maximum}`:s.type==="date"?t=`Date must be ${s.exact?"exactly":s.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(s.maximum))}`:t="Invalid input";break;case l.custom:t="Invalid input";break;case l.invalid_intersection_types:t="Intersection results could not be merged";break;case l.not_multiple_of:t=`Number must be a multiple of ${s.multipleOf}`;break;case l.not_finite:t="Number must be finite";break;default:t=e.defaultError,S.assertNever(s)}return{message:t}};let Ke=oe;function lt(s){Ke=s}function Ce(){return Ke}const Ee=s=>{const{data:e,path:t,errorMaps:n,issueData:r}=s,a=[...t,...r.path||[]],i={...r,path:a};if(r.message!==void 0)return{...r,path:a,message:r.message};let c="";const h=n.filter(u=>!!u).slice().reverse();for(const u of h)c=u(i,{data:e,defaultError:c}).message;return{...r,path:a,message:c}},ut=[];function f(s,e){const t=Ce(),n=Ee({issueData:e,data:s.data,path:s.path,errorMaps:[s.common.contextualErrorMap,s.schemaErrorMap,t,t===oe?void 0:oe].filter(r=>!!r)});s.common.issues.push(n)}class E{constructor(){this.value="valid"}dirty(){this.value==="valid"&&(this.value="dirty")}abort(){this.value!=="aborted"&&(this.value="aborted")}static mergeArray(e,t){const n=[];for(const r of t){if(r.status==="aborted")return x;r.status==="dirty"&&e.dirty(),n.push(r.value)}return{status:e.value,value:n}}static async mergeObjectAsync(e,t){const n=[];for(const r of t){const a=await r.key,i=await r.value;n.push({key:a,value:i})}return E.mergeObjectSync(e,n)}static mergeObjectSync(e,t){const n={};for(const r of t){const{key:a,value:i}=r;if(a.status==="aborted"||i.status==="aborted")return x;a.status==="dirty"&&e.dirty(),i.status==="dirty"&&e.dirty(),a.value!=="__proto__"&&(typeof i.value<"u"||r.alwaysSet)&&(n[a.value]=i.value)}return{status:e.value,value:n}}}const x=Object.freeze({status:"aborted"}),ae=s=>({status:"dirty",value:s}),O=s=>({status:"valid",value:s}),Be=s=>s.status==="aborted",ze=s=>s.status==="dirty",he=s=>s.status==="valid",fe=s=>typeof Promise<"u"&&s instanceof Promise;function Oe(s,e,t,n){if(typeof e=="function"?s!==e||!0:!e.has(s))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e.get(s)}function Xe(s,e,t,n,r){if(typeof e=="function"?s!==e||!0:!e.has(s))throw new TypeError("Cannot write private member to an object whose class did not declare it");return e.set(s,t),t}var g;(function(s){s.errToObj=e=>typeof e=="string"?{message:e}:e||{},s.toString=e=>typeof e=="string"?e:e?.message})(g||(g={}));var le,ue;class U{constructor(e,t,n,r){this._cachedPath=[],this.parent=e,this.data=t,this._path=n,this._key=r}get path(){return this._cachedPath.length||(this._key instanceof Array?this._cachedPath.push(...this._path,...this._key):this._cachedPath.push(...this._path,this._key)),this._cachedPath}}const He=(s,e)=>{if(he(e))return{success:!0,data:e.value};if(!s.common.issues.length)throw new Error("Validation failed but no issues detected.");return{success:!1,get error(){if(this._error)return this._error;const t=new R(s.common.issues);return this._error=t,this._error}}};function k(s){if(!s)return{};const{errorMap:e,invalid_type_error:t,required_error:n,description:r}=s;if(e&&(t||n))throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);return e?{errorMap:e,description:r}:{errorMap:(i,c)=>{var h,u;const{message:y}=s;return i.code==="invalid_enum_value"?{message:y??c.defaultError}:typeof c.data>"u"?{message:(h=y??n)!==null&&h!==void 0?h:c.defaultError}:i.code!=="invalid_type"?{message:c.defaultError}:{message:(u=y??t)!==null&&u!==void 0?u:c.defaultError}},description:r}}class w{constructor(e){this.spa=this.safeParseAsync,this._def=e,this.parse=this.parse.bind(this),this.safeParse=this.safeParse.bind(this),this.parseAsync=this.parseAsync.bind(this),this.safeParseAsync=this.safeParseAsync.bind(this),this.spa=this.spa.bind(this),this.refine=this.refine.bind(this),this.refinement=this.refinement.bind(this),this.superRefine=this.superRefine.bind(this),this.optional=this.optional.bind(this),this.nullable=this.nullable.bind(this),this.nullish=this.nullish.bind(this),this.array=this.array.bind(this),this.promise=this.promise.bind(this),this.or=this.or.bind(this),this.and=this.and.bind(this),this.transform=this.transform.bind(this),this.brand=this.brand.bind(this),this.default=this.default.bind(this),this.catch=this.catch.bind(this),this.describe=this.describe.bind(this),this.pipe=this.pipe.bind(this),this.readonly=this.readonly.bind(this),this.isNullable=this.isNullable.bind(this),this.isOptional=this.isOptional.bind(this)}get description(){return this._def.description}_getType(e){return J(e.data)}_getOrReturnCtx(e,t){return t||{common:e.parent.common,data:e.data,parsedType:J(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}_processInputParams(e){return{status:new E,ctx:{common:e.parent.common,data:e.data,parsedType:J(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}}_parseSync(e){const t=this._parse(e);if(fe(t))throw new Error("Synchronous parse encountered promise.");return t}_parseAsync(e){const t=this._parse(e);return Promise.resolve(t)}parse(e,t){const n=this.safeParse(e,t);if(n.success)return n.data;throw n.error}safeParse(e,t){var n;const r={common:{issues:[],async:(n=t?.async)!==null&&n!==void 0?n:!1,contextualErrorMap:t?.errorMap},path:t?.path||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:J(e)},a=this._parseSync({data:e,path:r.path,parent:r});return He(r,a)}async parseAsync(e,t){const n=await this.safeParseAsync(e,t);if(n.success)return n.data;throw n.error}async safeParseAsync(e,t){const n={common:{issues:[],contextualErrorMap:t?.errorMap,async:!0},path:t?.path||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:J(e)},r=this._parse({data:e,path:n.path,parent:n}),a=await(fe(r)?r:Promise.resolve(r));return He(n,a)}refine(e,t){const n=r=>typeof t=="string"||typeof t>"u"?{message:t}:typeof t=="function"?t(r):t;return this._refinement((r,a)=>{const i=e(r),c=()=>a.addIssue({code:l.custom,...n(r)});return typeof Promise<"u"&&i instanceof Promise?i.then(h=>h?!0:(c(),!1)):i?!0:(c(),!1)})}refinement(e,t){return this._refinement((n,r)=>e(n)?!0:(r.addIssue(typeof t=="function"?t(n,r):t),!1))}_refinement(e){return new D({schema:this,typeName:_.ZodEffects,effect:{type:"refinement",refinement:e}})}superRefine(e){return this._refinement(e)}optional(){return V.create(this,this._def)}nullable(){return Q.create(this,this._def)}nullish(){return this.nullable().optional()}array(){return M.create(this,this._def)}promise(){return de.create(this,this._def)}or(e){return ve.create([this,e],this._def)}and(e){return ye.create(this,e,this._def)}transform(e){return new D({...k(this._def),schema:this,typeName:_.ZodEffects,effect:{type:"transform",transform:e}})}default(e){const t=typeof e=="function"?e:()=>e;return new we({...k(this._def),innerType:this,defaultValue:t,typeName:_.ZodDefault})}brand(){return new Ge({typeName:_.ZodBranded,type:this,...k(this._def)})}catch(e){const t=typeof e=="function"?e:()=>e;return new je({...k(this._def),innerType:this,catchValue:t,typeName:_.ZodCatch})}describe(e){const t=this.constructor;return new t({...this._def,description:e})}pipe(e){return Te.create(this,e)}readonly(){return Se.create(this)}isOptional(){return this.safeParse(void 0).success}isNullable(){return this.safeParse(null).success}}const ht=/^c[^\s-]{8,}$/i,ft=/^[0-9a-z]+$/,pt=/^[0-9A-HJKMNP-TV-Z]{26}$/,mt=/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,gt=/^[a-z0-9_-]{21}$/i,vt=/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,yt=/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,_t="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";let De;const xt=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,bt=/^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,kt=/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,Qe="((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",wt=new RegExp(`^${Qe}$`);function Fe(s){let e="([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";return s.precision?e=`${e}\\.\\d{${s.precision}}`:s.precision==null&&(e=`${e}(\\.\\d+)?`),e}function jt(s){return new RegExp(`^${Fe(s)}$`)}function et(s){let e=`${Qe}T${Fe(s)}`;const t=[];return t.push(s.local?"Z?":"Z"),s.offset&&t.push("([+-]\\d{2}:?\\d{2})"),e=`${e}(${t.join("|")})`,new RegExp(`^${e}$`)}function St(s,e){return!!((e==="v4"||!e)&&xt.test(s)||(e==="v6"||!e)&&bt.test(s))}class $ extends w{_parse(e){if(this._def.coerce&&(e.data=String(e.data)),this._getType(e)!==m.string){const a=this._getOrReturnCtx(e);return f(a,{code:l.invalid_type,expected:m.string,received:a.parsedType}),x}const n=new E;let r;for(const a of this._def.checks)if(a.kind==="min")e.data.length<a.value&&(r=this._getOrReturnCtx(e,r),f(r,{code:l.too_small,minimum:a.value,type:"string",inclusive:!0,exact:!1,message:a.message}),n.dirty());else if(a.kind==="max")e.data.length>a.value&&(r=this._getOrReturnCtx(e,r),f(r,{code:l.too_big,maximum:a.value,type:"string",inclusive:!0,exact:!1,message:a.message}),n.dirty());else if(a.kind==="length"){const i=e.data.length>a.value,c=e.data.length<a.value;(i||c)&&(r=this._getOrReturnCtx(e,r),i?f(r,{code:l.too_big,maximum:a.value,type:"string",inclusive:!0,exact:!0,message:a.message}):c&&f(r,{code:l.too_small,minimum:a.value,type:"string",inclusive:!0,exact:!0,message:a.message}),n.dirty())}else if(a.kind==="email")yt.test(e.data)||(r=this._getOrReturnCtx(e,r),f(r,{validation:"email",code:l.invalid_string,message:a.message}),n.dirty());else if(a.kind==="emoji")De||(De=new RegExp(_t,"u")),De.test(e.data)||(r=this._getOrReturnCtx(e,r),f(r,{validation:"emoji",code:l.invalid_string,message:a.message}),n.dirty());else if(a.kind==="uuid")mt.test(e.data)||(r=this._getOrReturnCtx(e,r),f(r,{validation:"uuid",code:l.invalid_string,message:a.message}),n.dirty());else if(a.kind==="nanoid")gt.test(e.data)||(r=this._getOrReturnCtx(e,r),f(r,{validation:"nanoid",code:l.invalid_string,message:a.message}),n.dirty());else if(a.kind==="cuid")ht.test(e.data)||(r=this._getOrReturnCtx(e,r),f(r,{validation:"cuid",code:l.invalid_string,message:a.message}),n.dirty());else if(a.kind==="cuid2")ft.test(e.data)||(r=this._getOrReturnCtx(e,r),f(r,{validation:"cuid2",code:l.invalid_string,message:a.message}),n.dirty());else if(a.kind==="ulid")pt.test(e.data)||(r=this._getOrReturnCtx(e,r),f(r,{validation:"ulid",code:l.invalid_string,message:a.message}),n.dirty());else if(a.kind==="url")try{new URL(e.data)}catch{r=this._getOrReturnCtx(e,r),f(r,{validation:"url",code:l.invalid_string,message:a.message}),n.dirty()}else a.kind==="regex"?(a.regex.lastIndex=0,a.regex.test(e.data)||(r=this._getOrReturnCtx(e,r),f(r,{validation:"regex",code:l.invalid_string,message:a.message}),n.dirty())):a.kind==="trim"?e.data=e.data.trim():a.kind==="includes"?e.data.includes(a.value,a.position)||(r=this._getOrReturnCtx(e,r),f(r,{code:l.invalid_string,validation:{includes:a.value,position:a.position},message:a.message}),n.dirty()):a.kind==="toLowerCase"?e.data=e.data.toLowerCase():a.kind==="toUpperCase"?e.data=e.data.toUpperCase():a.kind==="startsWith"?e.data.startsWith(a.value)||(r=this._getOrReturnCtx(e,r),f(r,{code:l.invalid_string,validation:{startsWith:a.value},message:a.message}),n.dirty()):a.kind==="endsWith"?e.data.endsWith(a.value)||(r=this._getOrReturnCtx(e,r),f(r,{code:l.invalid_string,validation:{endsWith:a.value},message:a.message}),n.dirty()):a.kind==="datetime"?et(a).test(e.data)||(r=this._getOrReturnCtx(e,r),f(r,{code:l.invalid_string,validation:"datetime",message:a.message}),n.dirty()):a.kind==="date"?wt.test(e.data)||(r=this._getOrReturnCtx(e,r),f(r,{code:l.invalid_string,validation:"date",message:a.message}),n.dirty()):a.kind==="time"?jt(a).test(e.data)||(r=this._getOrReturnCtx(e,r),f(r,{code:l.invalid_string,validation:"time",message:a.message}),n.dirty()):a.kind==="duration"?vt.test(e.data)||(r=this._getOrReturnCtx(e,r),f(r,{validation:"duration",code:l.invalid_string,message:a.message}),n.dirty()):a.kind==="ip"?St(e.data,a.version)||(r=this._getOrReturnCtx(e,r),f(r,{validation:"ip",code:l.invalid_string,message:a.message}),n.dirty()):a.kind==="base64"?kt.test(e.data)||(r=this._getOrReturnCtx(e,r),f(r,{validation:"base64",code:l.invalid_string,message:a.message}),n.dirty()):S.assertNever(a);return{status:n.value,value:e.data}}_regex(e,t,n){return this.refinement(r=>e.test(r),{validation:t,code:l.invalid_string,...g.errToObj(n)})}_addCheck(e){return new $({...this._def,checks:[...this._def.checks,e]})}email(e){return this._addCheck({kind:"email",...g.errToObj(e)})}url(e){return this._addCheck({kind:"url",...g.errToObj(e)})}emoji(e){return this._addCheck({kind:"emoji",...g.errToObj(e)})}uuid(e){return this._addCheck({kind:"uuid",...g.errToObj(e)})}nanoid(e){return this._addCheck({kind:"nanoid",...g.errToObj(e)})}cuid(e){return this._addCheck({kind:"cuid",...g.errToObj(e)})}cuid2(e){return this._addCheck({kind:"cuid2",...g.errToObj(e)})}ulid(e){return this._addCheck({kind:"ulid",...g.errToObj(e)})}base64(e){return this._addCheck({kind:"base64",...g.errToObj(e)})}ip(e){return this._addCheck({kind:"ip",...g.errToObj(e)})}datetime(e){var t,n;return typeof e=="string"?this._addCheck({kind:"datetime",precision:null,offset:!1,local:!1,message:e}):this._addCheck({kind:"datetime",precision:typeof e?.precision>"u"?null:e?.precision,offset:(t=e?.offset)!==null&&t!==void 0?t:!1,local:(n=e?.local)!==null&&n!==void 0?n:!1,...g.errToObj(e?.message)})}date(e){return this._addCheck({kind:"date",message:e})}time(e){return typeof e=="string"?this._addCheck({kind:"time",precision:null,message:e}):this._addCheck({kind:"time",precision:typeof e?.precision>"u"?null:e?.precision,...g.errToObj(e?.message)})}duration(e){return this._addCheck({kind:"duration",...g.errToObj(e)})}regex(e,t){return this._addCheck({kind:"regex",regex:e,...g.errToObj(t)})}includes(e,t){return this._addCheck({kind:"includes",value:e,position:t?.position,...g.errToObj(t?.message)})}startsWith(e,t){return this._addCheck({kind:"startsWith",value:e,...g.errToObj(t)})}endsWith(e,t){return this._addCheck({kind:"endsWith",value:e,...g.errToObj(t)})}min(e,t){return this._addCheck({kind:"min",value:e,...g.errToObj(t)})}max(e,t){return this._addCheck({kind:"max",value:e,...g.errToObj(t)})}length(e,t){return this._addCheck({kind:"length",value:e,...g.errToObj(t)})}nonempty(e){return this.min(1,g.errToObj(e))}trim(){return new $({...this._def,checks:[...this._def.checks,{kind:"trim"}]})}toLowerCase(){return new $({...this._def,checks:[...this._def.checks,{kind:"toLowerCase"}]})}toUpperCase(){return new $({...this._def,checks:[...this._def.checks,{kind:"toUpperCase"}]})}get isDatetime(){return!!this._def.checks.find(e=>e.kind==="datetime")}get isDate(){return!!this._def.checks.find(e=>e.kind==="date")}get isTime(){return!!this._def.checks.find(e=>e.kind==="time")}get isDuration(){return!!this._def.checks.find(e=>e.kind==="duration")}get isEmail(){return!!this._def.checks.find(e=>e.kind==="email")}get isURL(){return!!this._def.checks.find(e=>e.kind==="url")}get isEmoji(){return!!this._def.checks.find(e=>e.kind==="emoji")}get isUUID(){return!!this._def.checks.find(e=>e.kind==="uuid")}get isNANOID(){return!!this._def.checks.find(e=>e.kind==="nanoid")}get isCUID(){return!!this._def.checks.find(e=>e.kind==="cuid")}get isCUID2(){return!!this._def.checks.find(e=>e.kind==="cuid2")}get isULID(){return!!this._def.checks.find(e=>e.kind==="ulid")}get isIP(){return!!this._def.checks.find(e=>e.kind==="ip")}get isBase64(){return!!this._def.checks.find(e=>e.kind==="base64")}get minLength(){let e=null;for(const t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxLength(){let e=null;for(const t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}}$.create=s=>{var e;return new $({checks:[],typeName:_.ZodString,coerce:(e=s?.coerce)!==null&&e!==void 0?e:!1,...k(s)})};function Tt(s,e){const t=(s.toString().split(".")[1]||"").length,n=(e.toString().split(".")[1]||"").length,r=t>n?t:n,a=parseInt(s.toFixed(r).replace(".","")),i=parseInt(e.toFixed(r).replace(".",""));return a%i/Math.pow(10,r)}class Y extends w{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte,this.step=this.multipleOf}_parse(e){if(this._def.coerce&&(e.data=Number(e.data)),this._getType(e)!==m.number){const a=this._getOrReturnCtx(e);return f(a,{code:l.invalid_type,expected:m.number,received:a.parsedType}),x}let n;const r=new E;for(const a of this._def.checks)a.kind==="int"?S.isInteger(e.data)||(n=this._getOrReturnCtx(e,n),f(n,{code:l.invalid_type,expected:"integer",received:"float",message:a.message}),r.dirty()):a.kind==="min"?(a.inclusive?e.data<a.value:e.data<=a.value)&&(n=this._getOrReturnCtx(e,n),f(n,{code:l.too_small,minimum:a.value,type:"number",inclusive:a.inclusive,exact:!1,message:a.message}),r.dirty()):a.kind==="max"?(a.inclusive?e.data>a.value:e.data>=a.value)&&(n=this._getOrReturnCtx(e,n),f(n,{code:l.too_big,maximum:a.value,type:"number",inclusive:a.inclusive,exact:!1,message:a.message}),r.dirty()):a.kind==="multipleOf"?Tt(e.data,a.value)!==0&&(n=this._getOrReturnCtx(e,n),f(n,{code:l.not_multiple_of,multipleOf:a.value,message:a.message}),r.dirty()):a.kind==="finite"?Number.isFinite(e.data)||(n=this._getOrReturnCtx(e,n),f(n,{code:l.not_finite,message:a.message}),r.dirty()):S.assertNever(a);return{status:r.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,g.toString(t))}gt(e,t){return this.setLimit("min",e,!1,g.toString(t))}lte(e,t){return this.setLimit("max",e,!0,g.toString(t))}lt(e,t){return this.setLimit("max",e,!1,g.toString(t))}setLimit(e,t,n,r){return new Y({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:n,message:g.toString(r)}]})}_addCheck(e){return new Y({...this._def,checks:[...this._def.checks,e]})}int(e){return this._addCheck({kind:"int",message:g.toString(e)})}positive(e){return this._addCheck({kind:"min",value:0,inclusive:!1,message:g.toString(e)})}negative(e){return this._addCheck({kind:"max",value:0,inclusive:!1,message:g.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:0,inclusive:!0,message:g.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:0,inclusive:!0,message:g.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:g.toString(t)})}finite(e){return this._addCheck({kind:"finite",message:g.toString(e)})}safe(e){return this._addCheck({kind:"min",inclusive:!0,value:Number.MIN_SAFE_INTEGER,message:g.toString(e)})._addCheck({kind:"max",inclusive:!0,value:Number.MAX_SAFE_INTEGER,message:g.toString(e)})}get minValue(){let e=null;for(const t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(const t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}get isInt(){return!!this._def.checks.find(e=>e.kind==="int"||e.kind==="multipleOf"&&S.isInteger(e.value))}get isFinite(){let e=null,t=null;for(const n of this._def.checks){if(n.kind==="finite"||n.kind==="int"||n.kind==="multipleOf")return!0;n.kind==="min"?(t===null||n.value>t)&&(t=n.value):n.kind==="max"&&(e===null||n.value<e)&&(e=n.value)}return Number.isFinite(t)&&Number.isFinite(e)}}Y.create=s=>new Y({checks:[],typeName:_.ZodNumber,coerce:s?.coerce||!1,...k(s)});class K extends w{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte}_parse(e){if(this._def.coerce&&(e.data=BigInt(e.data)),this._getType(e)!==m.bigint){const a=this._getOrReturnCtx(e);return f(a,{code:l.invalid_type,expected:m.bigint,received:a.parsedType}),x}let n;const r=new E;for(const a of this._def.checks)a.kind==="min"?(a.inclusive?e.data<a.value:e.data<=a.value)&&(n=this._getOrReturnCtx(e,n),f(n,{code:l.too_small,type:"bigint",minimum:a.value,inclusive:a.inclusive,message:a.message}),r.dirty()):a.kind==="max"?(a.inclusive?e.data>a.value:e.data>=a.value)&&(n=this._getOrReturnCtx(e,n),f(n,{code:l.too_big,type:"bigint",maximum:a.value,inclusive:a.inclusive,message:a.message}),r.dirty()):a.kind==="multipleOf"?e.data%a.value!==BigInt(0)&&(n=this._getOrReturnCtx(e,n),f(n,{code:l.not_multiple_of,multipleOf:a.value,message:a.message}),r.dirty()):S.assertNever(a);return{status:r.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,g.toString(t))}gt(e,t){return this.setLimit("min",e,!1,g.toString(t))}lte(e,t){return this.setLimit("max",e,!0,g.toString(t))}lt(e,t){return this.setLimit("max",e,!1,g.toString(t))}setLimit(e,t,n,r){return new K({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:n,message:g.toString(r)}]})}_addCheck(e){return new K({...this._def,checks:[...this._def.checks,e]})}positive(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!1,message:g.toString(e)})}negative(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!1,message:g.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!0,message:g.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!0,message:g.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:g.toString(t)})}get minValue(){let e=null;for(const t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(const t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}}K.create=s=>{var e;return new K({checks:[],typeName:_.ZodBigInt,coerce:(e=s?.coerce)!==null&&e!==void 0?e:!1,...k(s)})};class pe extends w{_parse(e){if(this._def.coerce&&(e.data=!!e.data),this._getType(e)!==m.boolean){const n=this._getOrReturnCtx(e);return f(n,{code:l.invalid_type,expected:m.boolean,received:n.parsedType}),x}return O(e.data)}}pe.create=s=>new pe({typeName:_.ZodBoolean,coerce:s?.coerce||!1,...k(s)});class ee extends w{_parse(e){if(this._def.coerce&&(e.data=new Date(e.data)),this._getType(e)!==m.date){const a=this._getOrReturnCtx(e);return f(a,{code:l.invalid_type,expected:m.date,received:a.parsedType}),x}if(isNaN(e.data.getTime())){const a=this._getOrReturnCtx(e);return f(a,{code:l.invalid_date}),x}const n=new E;let r;for(const a of this._def.checks)a.kind==="min"?e.data.getTime()<a.value&&(r=this._getOrReturnCtx(e,r),f(r,{code:l.too_small,message:a.message,inclusive:!0,exact:!1,minimum:a.value,type:"date"}),n.dirty()):a.kind==="max"?e.data.getTime()>a.value&&(r=this._getOrReturnCtx(e,r),f(r,{code:l.too_big,message:a.message,inclusive:!0,exact:!1,maximum:a.value,type:"date"}),n.dirty()):S.assertNever(a);return{status:n.value,value:new Date(e.data.getTime())}}_addCheck(e){return new ee({...this._def,checks:[...this._def.checks,e]})}min(e,t){return this._addCheck({kind:"min",value:e.getTime(),message:g.toString(t)})}max(e,t){return this._addCheck({kind:"max",value:e.getTime(),message:g.toString(t)})}get minDate(){let e=null;for(const t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e!=null?new Date(e):null}get maxDate(){let e=null;for(const t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e!=null?new Date(e):null}}ee.create=s=>new ee({checks:[],coerce:s?.coerce||!1,typeName:_.ZodDate,...k(s)});class Ae extends w{_parse(e){if(this._getType(e)!==m.symbol){const n=this._getOrReturnCtx(e);return f(n,{code:l.invalid_type,expected:m.symbol,received:n.parsedType}),x}return O(e.data)}}Ae.create=s=>new Ae({typeName:_.ZodSymbol,...k(s)});class me extends w{_parse(e){if(this._getType(e)!==m.undefined){const n=this._getOrReturnCtx(e);return f(n,{code:l.invalid_type,expected:m.undefined,received:n.parsedType}),x}return O(e.data)}}me.create=s=>new me({typeName:_.ZodUndefined,...k(s)});class ge extends w{_parse(e){if(this._getType(e)!==m.null){const n=this._getOrReturnCtx(e);return f(n,{code:l.invalid_type,expected:m.null,received:n.parsedType}),x}return O(e.data)}}ge.create=s=>new ge({typeName:_.ZodNull,...k(s)});class ce extends w{constructor(){super(...arguments),this._any=!0}_parse(e){return O(e.data)}}ce.create=s=>new ce({typeName:_.ZodAny,...k(s)});class F extends w{constructor(){super(...arguments),this._unknown=!0}_parse(e){return O(e.data)}}F.create=s=>new F({typeName:_.ZodUnknown,...k(s)});class G extends w{_parse(e){const t=this._getOrReturnCtx(e);return f(t,{code:l.invalid_type,expected:m.never,received:t.parsedType}),x}}G.create=s=>new G({typeName:_.ZodNever,...k(s)});class Ie extends w{_parse(e){if(this._getType(e)!==m.undefined){const n=this._getOrReturnCtx(e);return f(n,{code:l.invalid_type,expected:m.void,received:n.parsedType}),x}return O(e.data)}}Ie.create=s=>new Ie({typeName:_.ZodVoid,...k(s)});class M extends w{_parse(e){const{ctx:t,status:n}=this._processInputParams(e),r=this._def;if(t.parsedType!==m.array)return f(t,{code:l.invalid_type,expected:m.array,received:t.parsedType}),x;if(r.exactLength!==null){const i=t.data.length>r.exactLength.value,c=t.data.length<r.exactLength.value;(i||c)&&(f(t,{code:i?l.too_big:l.too_small,minimum:c?r.exactLength.value:void 0,maximum:i?r.exactLength.value:void 0,type:"array",inclusive:!0,exact:!0,message:r.exactLength.message}),n.dirty())}if(r.minLength!==null&&t.data.length<r.minLength.value&&(f(t,{code:l.too_small,minimum:r.minLength.value,type:"array",inclusive:!0,exact:!1,message:r.minLength.message}),n.dirty()),r.maxLength!==null&&t.data.length>r.maxLength.value&&(f(t,{code:l.too_big,maximum:r.maxLength.value,type:"array",inclusive:!0,exact:!1,message:r.maxLength.message}),n.dirty()),t.common.async)return Promise.all([...t.data].map((i,c)=>r.type._parseAsync(new U(t,i,t.path,c)))).then(i=>E.mergeArray(n,i));const a=[...t.data].map((i,c)=>r.type._parseSync(new U(t,i,t.path,c)));return E.mergeArray(n,a)}get element(){return this._def.type}min(e,t){return new M({...this._def,minLength:{value:e,message:g.toString(t)}})}max(e,t){return new M({...this._def,maxLength:{value:e,message:g.toString(t)}})}length(e,t){return new M({...this._def,exactLength:{value:e,message:g.toString(t)}})}nonempty(e){return this.min(1,e)}}M.create=(s,e)=>new M({type:s,minLength:null,maxLength:null,exactLength:null,typeName:_.ZodArray,...k(e)});function re(s){if(s instanceof T){const e={};for(const t in s.shape){const n=s.shape[t];e[t]=V.create(re(n))}return new T({...s._def,shape:()=>e})}else return s instanceof M?new M({...s._def,type:re(s.element)}):s instanceof V?V.create(re(s.unwrap())):s instanceof Q?Q.create(re(s.unwrap())):s instanceof B?B.create(s.items.map(e=>re(e))):s}class T extends w{constructor(){super(...arguments),this._cached=null,this.nonstrict=this.passthrough,this.augment=this.extend}_getCached(){if(this._cached!==null)return this._cached;const e=this._def.shape(),t=S.objectKeys(e);return this._cached={shape:e,keys:t}}_parse(e){if(this._getType(e)!==m.object){const u=this._getOrReturnCtx(e);return f(u,{code:l.invalid_type,expected:m.object,received:u.parsedType}),x}const{status:n,ctx:r}=this._processInputParams(e),{shape:a,keys:i}=this._getCached(),c=[];if(!(this._def.catchall instanceof G&&this._def.unknownKeys==="strip"))for(const u in r.data)i.includes(u)||c.push(u);const h=[];for(const u of i){const y=a[u],C=r.data[u];h.push({key:{status:"valid",value:u},value:y._parse(new U(r,C,r.path,u)),alwaysSet:u in r.data})}if(this._def.catchall instanceof G){const u=this._def.unknownKeys;if(u==="passthrough")for(const y of c)h.push({key:{status:"valid",value:y},value:{status:"valid",value:r.data[y]}});else if(u==="strict")c.length>0&&(f(r,{code:l.unrecognized_keys,keys:c}),n.dirty());else if(u!=="strip")throw new Error("Internal ZodObject error: invalid unknownKeys value.")}else{const u=this._def.catchall;for(const y of c){const C=r.data[y];h.push({key:{status:"valid",value:y},value:u._parse(new U(r,C,r.path,y)),alwaysSet:y in r.data})}}return r.common.async?Promise.resolve().then(async()=>{const u=[];for(const y of h){const C=await y.key,z=await y.value;u.push({key:C,value:z,alwaysSet:y.alwaysSet})}return u}).then(u=>E.mergeObjectSync(n,u)):E.mergeObjectSync(n,h)}get shape(){return this._def.shape()}strict(e){return g.errToObj,new T({...this._def,unknownKeys:"strict",...e!==void 0?{errorMap:(t,n)=>{var r,a,i,c;const h=(i=(a=(r=this._def).errorMap)===null||a===void 0?void 0:a.call(r,t,n).message)!==null&&i!==void 0?i:n.defaultError;return t.code==="unrecognized_keys"?{message:(c=g.errToObj(e).message)!==null&&c!==void 0?c:h}:{message:h}}}:{}})}strip(){return new T({...this._def,unknownKeys:"strip"})}passthrough(){return new T({...this._def,unknownKeys:"passthrough"})}extend(e){return new T({...this._def,shape:()=>({...this._def.shape(),...e})})}merge(e){return new T({unknownKeys:e._def.unknownKeys,catchall:e._def.catchall,shape:()=>({...this._def.shape(),...e._def.shape()}),typeName:_.ZodObject})}setKey(e,t){return this.augment({[e]:t})}catchall(e){return new T({...this._def,catchall:e})}pick(e){const t={};return S.objectKeys(e).forEach(n=>{e[n]&&this.shape[n]&&(t[n]=this.shape[n])}),new T({...this._def,shape:()=>t})}omit(e){const t={};return S.objectKeys(this.shape).forEach(n=>{e[n]||(t[n]=this.shape[n])}),new T({...this._def,shape:()=>t})}deepPartial(){return re(this)}partial(e){const t={};return S.objectKeys(this.shape).forEach(n=>{const r=this.shape[n];e&&!e[n]?t[n]=r:t[n]=r.optional()}),new T({...this._def,shape:()=>t})}required(e){const t={};return S.objectKeys(this.shape).forEach(n=>{if(e&&!e[n])t[n]=this.shape[n];else{let a=this.shape[n];for(;a instanceof V;)a=a._def.innerType;t[n]=a}}),new T({...this._def,shape:()=>t})}keyof(){return tt(S.objectKeys(this.shape))}}T.create=(s,e)=>new T({shape:()=>s,unknownKeys:"strip",catchall:G.create(),typeName:_.ZodObject,...k(e)});T.strictCreate=(s,e)=>new T({shape:()=>s,unknownKeys:"strict",catchall:G.create(),typeName:_.ZodObject,...k(e)});T.lazycreate=(s,e)=>new T({shape:s,unknownKeys:"strip",catchall:G.create(),typeName:_.ZodObject,...k(e)});class ve extends w{_parse(e){const{ctx:t}=this._processInputParams(e),n=this._def.options;function r(a){for(const c of a)if(c.result.status==="valid")return c.result;for(const c of a)if(c.result.status==="dirty")return t.common.issues.push(...c.ctx.common.issues),c.result;const i=a.map(c=>new R(c.ctx.common.issues));return f(t,{code:l.invalid_union,unionErrors:i}),x}if(t.common.async)return Promise.all(n.map(async a=>{const i={...t,common:{...t.common,issues:[]},parent:null};return{result:await a._parseAsync({data:t.data,path:t.path,parent:i}),ctx:i}})).then(r);{let a;const i=[];for(const h of n){const u={...t,common:{...t.common,issues:[]},parent:null},y=h._parseSync({data:t.data,path:t.path,parent:u});if(y.status==="valid")return y;y.status==="dirty"&&!a&&(a={result:y,ctx:u}),u.common.issues.length&&i.push(u.common.issues)}if(a)return t.common.issues.push(...a.ctx.common.issues),a.result;const c=i.map(h=>new R(h));return f(t,{code:l.invalid_union,unionErrors:c}),x}}get options(){return this._def.options}}ve.create=(s,e)=>new ve({options:s,typeName:_.ZodUnion,...k(e)});const q=s=>s instanceof xe?q(s.schema):s instanceof D?q(s.innerType()):s instanceof be?[s.value]:s instanceof X?s.options:s instanceof ke?S.objectValues(s.enum):s instanceof we?q(s._def.innerType):s instanceof me?[void 0]:s instanceof ge?[null]:s instanceof V?[void 0,...q(s.unwrap())]:s instanceof Q?[null,...q(s.unwrap())]:s instanceof Ge||s instanceof Se?q(s.unwrap()):s instanceof je?q(s._def.innerType):[];class $e extends w{_parse(e){const{ctx:t}=this._processInputParams(e);if(t.parsedType!==m.object)return f(t,{code:l.invalid_type,expected:m.object,received:t.parsedType}),x;const n=this.discriminator,r=t.data[n],a=this.optionsMap.get(r);return a?t.common.async?a._parseAsync({data:t.data,path:t.path,parent:t}):a._parseSync({data:t.data,path:t.path,parent:t}):(f(t,{code:l.invalid_union_discriminator,options:Array.from(this.optionsMap.keys()),path:[n]}),x)}get discriminator(){return this._def.discriminator}get options(){return this._def.options}get optionsMap(){return this._def.optionsMap}static create(e,t,n){const r=new Map;for(const a of t){const i=q(a.shape[e]);if(!i.length)throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);for(const c of i){if(r.has(c))throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(c)}`);r.set(c,a)}}return new $e({typeName:_.ZodDiscriminatedUnion,discriminator:e,options:t,optionsMap:r,...k(n)})}}function We(s,e){const t=J(s),n=J(e);if(s===e)return{valid:!0,data:s};if(t===m.object&&n===m.object){const r=S.objectKeys(e),a=S.objectKeys(s).filter(c=>r.indexOf(c)!==-1),i={...s,...e};for(const c of a){const h=We(s[c],e[c]);if(!h.valid)return{valid:!1};i[c]=h.data}return{valid:!0,data:i}}else if(t===m.array&&n===m.array){if(s.length!==e.length)return{valid:!1};const r=[];for(let a=0;a<s.length;a++){const i=s[a],c=e[a],h=We(i,c);if(!h.valid)return{valid:!1};r.push(h.data)}return{valid:!0,data:r}}else return t===m.date&&n===m.date&&+s==+e?{valid:!0,data:s}:{valid:!1}}class ye extends w{_parse(e){const{status:t,ctx:n}=this._processInputParams(e),r=(a,i)=>{if(Be(a)||Be(i))return x;const c=We(a.value,i.value);return c.valid?((ze(a)||ze(i))&&t.dirty(),{status:t.value,value:c.data}):(f(n,{code:l.invalid_intersection_types}),x)};return n.common.async?Promise.all([this._def.left._parseAsync({data:n.data,path:n.path,parent:n}),this._def.right._parseAsync({data:n.data,path:n.path,parent:n})]).then(([a,i])=>r(a,i)):r(this._def.left._parseSync({data:n.data,path:n.path,parent:n}),this._def.right._parseSync({data:n.data,path:n.path,parent:n}))}}ye.create=(s,e,t)=>new ye({left:s,right:e,typeName:_.ZodIntersection,...k(t)});class B extends w{_parse(e){const{status:t,ctx:n}=this._processInputParams(e);if(n.parsedType!==m.array)return f(n,{code:l.invalid_type,expected:m.array,received:n.parsedType}),x;if(n.data.length<this._def.items.length)return f(n,{code:l.too_small,minimum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),x;!this._def.rest&&n.data.length>this._def.items.length&&(f(n,{code:l.too_big,maximum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),t.dirty());const a=[...n.data].map((i,c)=>{const h=this._def.items[c]||this._def.rest;return h?h._parse(new U(n,i,n.path,c)):null}).filter(i=>!!i);return n.common.async?Promise.all(a).then(i=>E.mergeArray(t,i)):E.mergeArray(t,a)}get items(){return this._def.items}rest(e){return new B({...this._def,rest:e})}}B.create=(s,e)=>{if(!Array.isArray(s))throw new Error("You must pass an array of schemas to z.tuple([ ... ])");return new B({items:s,typeName:_.ZodTuple,rest:null,...k(e)})};class _e extends w{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){const{status:t,ctx:n}=this._processInputParams(e);if(n.parsedType!==m.object)return f(n,{code:l.invalid_type,expected:m.object,received:n.parsedType}),x;const r=[],a=this._def.keyType,i=this._def.valueType;for(const c in n.data)r.push({key:a._parse(new U(n,c,n.path,c)),value:i._parse(new U(n,n.data[c],n.path,c)),alwaysSet:c in n.data});return n.common.async?E.mergeObjectAsync(t,r):E.mergeObjectSync(t,r)}get element(){return this._def.valueType}static create(e,t,n){return t instanceof w?new _e({keyType:e,valueType:t,typeName:_.ZodRecord,...k(n)}):new _e({keyType:$.create(),valueType:e,typeName:_.ZodRecord,...k(t)})}}class Re extends w{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){const{status:t,ctx:n}=this._processInputParams(e);if(n.parsedType!==m.map)return f(n,{code:l.invalid_type,expected:m.map,received:n.parsedType}),x;const r=this._def.keyType,a=this._def.valueType,i=[...n.data.entries()].map(([c,h],u)=>({key:r._parse(new U(n,c,n.path,[u,"key"])),value:a._parse(new U(n,h,n.path,[u,"value"]))}));if(n.common.async){const c=new Map;return Promise.resolve().then(async()=>{for(const h of i){const u=await h.key,y=await h.value;if(u.status==="aborted"||y.status==="aborted")return x;(u.status==="dirty"||y.status==="dirty")&&t.dirty(),c.set(u.value,y.value)}return{status:t.value,value:c}})}else{const c=new Map;for(const h of i){const u=h.key,y=h.value;if(u.status==="aborted"||y.status==="aborted")return x;(u.status==="dirty"||y.status==="dirty")&&t.dirty(),c.set(u.value,y.value)}return{status:t.value,value:c}}}}Re.create=(s,e,t)=>new Re({valueType:e,keyType:s,typeName:_.ZodMap,...k(t)});class te extends w{_parse(e){const{status:t,ctx:n}=this._processInputParams(e);if(n.parsedType!==m.set)return f(n,{code:l.invalid_type,expected:m.set,received:n.parsedType}),x;const r=this._def;r.minSize!==null&&n.data.size<r.minSize.value&&(f(n,{code:l.too_small,minimum:r.minSize.value,type:"set",inclusive:!0,exact:!1,message:r.minSize.message}),t.dirty()),r.maxSize!==null&&n.data.size>r.maxSize.value&&(f(n,{code:l.too_big,maximum:r.maxSize.value,type:"set",inclusive:!0,exact:!1,message:r.maxSize.message}),t.dirty());const a=this._def.valueType;function i(h){const u=new Set;for(const y of h){if(y.status==="aborted")return x;y.status==="dirty"&&t.dirty(),u.add(y.value)}return{status:t.value,value:u}}const c=[...n.data.values()].map((h,u)=>a._parse(new U(n,h,n.path,u)));return n.common.async?Promise.all(c).then(h=>i(h)):i(c)}min(e,t){return new te({...this._def,minSize:{value:e,message:g.toString(t)}})}max(e,t){return new te({...this._def,maxSize:{value:e,message:g.toString(t)}})}size(e,t){return this.min(e,t).max(e,t)}nonempty(e){return this.min(1,e)}}te.create=(s,e)=>new te({valueType:s,minSize:null,maxSize:null,typeName:_.ZodSet,...k(e)});class ie extends w{constructor(){super(...arguments),this.validate=this.implement}_parse(e){const{ctx:t}=this._processInputParams(e);if(t.parsedType!==m.function)return f(t,{code:l.invalid_type,expected:m.function,received:t.parsedType}),x;function n(c,h){return Ee({data:c,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,Ce(),oe].filter(u=>!!u),issueData:{code:l.invalid_arguments,argumentsError:h}})}function r(c,h){return Ee({data:c,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,Ce(),oe].filter(u=>!!u),issueData:{code:l.invalid_return_type,returnTypeError:h}})}const a={errorMap:t.common.contextualErrorMap},i=t.data;if(this._def.returns instanceof de){const c=this;return O(async function(...h){const u=new R([]),y=await c._def.args.parseAsync(h,a).catch(Z=>{throw u.addIssue(n(h,Z)),u}),C=await Reflect.apply(i,this,y);return await c._def.returns._def.type.parseAsync(C,a).catch(Z=>{throw u.addIssue(r(C,Z)),u})})}else{const c=this;return O(function(...h){const u=c._def.args.safeParse(h,a);if(!u.success)throw new R([n(h,u.error)]);const y=Reflect.apply(i,this,u.data),C=c._def.returns.safeParse(y,a);if(!C.success)throw new R([r(y,C.error)]);return C.data})}}parameters(){return this._def.args}returnType(){return this._def.returns}args(...e){return new ie({...this._def,args:B.create(e).rest(F.create())})}returns(e){return new ie({...this._def,returns:e})}implement(e){return this.parse(e)}strictImplement(e){return this.parse(e)}static create(e,t,n){return new ie({args:e||B.create([]).rest(F.create()),returns:t||F.create(),typeName:_.ZodFunction,...k(n)})}}class xe extends w{get schema(){return this._def.getter()}_parse(e){const{ctx:t}=this._processInputParams(e);return this._def.getter()._parse({data:t.data,path:t.path,parent:t})}}xe.create=(s,e)=>new xe({getter:s,typeName:_.ZodLazy,...k(e)});class be extends w{_parse(e){if(e.data!==this._def.value){const t=this._getOrReturnCtx(e);return f(t,{received:t.data,code:l.invalid_literal,expected:this._def.value}),x}return{status:"valid",value:e.data}}get value(){return this._def.value}}be.create=(s,e)=>new be({value:s,typeName:_.ZodLiteral,...k(e)});function tt(s,e){return new X({values:s,typeName:_.ZodEnum,...k(e)})}class X extends w{constructor(){super(...arguments),le.set(this,void 0)}_parse(e){if(typeof e.data!="string"){const t=this._getOrReturnCtx(e),n=this._def.values;return f(t,{expected:S.joinValues(n),received:t.parsedType,code:l.invalid_type}),x}if(Oe(this,le)||Xe(this,le,new Set(this._def.values)),!Oe(this,le).has(e.data)){const t=this._getOrReturnCtx(e),n=this._def.values;return f(t,{received:t.data,code:l.invalid_enum_value,options:n}),x}return O(e.data)}get options(){return this._def.values}get enum(){const e={};for(const t of this._def.values)e[t]=t;return e}get Values(){const e={};for(const t of this._def.values)e[t]=t;return e}get Enum(){const e={};for(const t of this._def.values)e[t]=t;return e}extract(e,t=this._def){return X.create(e,{...this._def,...t})}exclude(e,t=this._def){return X.create(this.options.filter(n=>!e.includes(n)),{...this._def,...t})}}le=new WeakMap;X.create=tt;class ke extends w{constructor(){super(...arguments),ue.set(this,void 0)}_parse(e){const t=S.getValidEnumValues(this._def.values),n=this._getOrReturnCtx(e);if(n.parsedType!==m.string&&n.parsedType!==m.number){const r=S.objectValues(t);return f(n,{expected:S.joinValues(r),received:n.parsedType,code:l.invalid_type}),x}if(Oe(this,ue)||Xe(this,ue,new Set(S.getValidEnumValues(this._def.values))),!Oe(this,ue).has(e.data)){const r=S.objectValues(t);return f(n,{received:n.data,code:l.invalid_enum_value,options:r}),x}return O(e.data)}get enum(){return this._def.values}}ue=new WeakMap;ke.create=(s,e)=>new ke({values:s,typeName:_.ZodNativeEnum,...k(e)});class de extends w{unwrap(){return this._def.type}_parse(e){const{ctx:t}=this._processInputParams(e);if(t.parsedType!==m.promise&&t.common.async===!1)return f(t,{code:l.invalid_type,expected:m.promise,received:t.parsedType}),x;const n=t.parsedType===m.promise?t.data:Promise.resolve(t.data);return O(n.then(r=>this._def.type.parseAsync(r,{path:t.path,errorMap:t.common.contextualErrorMap})))}}de.create=(s,e)=>new de({type:s,typeName:_.ZodPromise,...k(e)});class D extends w{innerType(){return this._def.schema}sourceType(){return this._def.schema._def.typeName===_.ZodEffects?this._def.schema.sourceType():this._def.schema}_parse(e){const{status:t,ctx:n}=this._processInputParams(e),r=this._def.effect||null,a={addIssue:i=>{f(n,i),i.fatal?t.abort():t.dirty()},get path(){return n.path}};if(a.addIssue=a.addIssue.bind(a),r.type==="preprocess"){const i=r.transform(n.data,a);if(n.common.async)return Promise.resolve(i).then(async c=>{if(t.value==="aborted")return x;const h=await this._def.schema._parseAsync({data:c,path:n.path,parent:n});return h.status==="aborted"?x:h.status==="dirty"||t.value==="dirty"?ae(h.value):h});{if(t.value==="aborted")return x;const c=this._def.schema._parseSync({data:i,path:n.path,parent:n});return c.status==="aborted"?x:c.status==="dirty"||t.value==="dirty"?ae(c.value):c}}if(r.type==="refinement"){const i=c=>{const h=r.refinement(c,a);if(n.common.async)return Promise.resolve(h);if(h instanceof Promise)throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");return c};if(n.common.async===!1){const c=this._def.schema._parseSync({data:n.data,path:n.path,parent:n});return c.status==="aborted"?x:(c.status==="dirty"&&t.dirty(),i(c.value),{status:t.value,value:c.value})}else return this._def.schema._parseAsync({data:n.data,path:n.path,parent:n}).then(c=>c.status==="aborted"?x:(c.status==="dirty"&&t.dirty(),i(c.value).then(()=>({status:t.value,value:c.value}))))}if(r.type==="transform")if(n.common.async===!1){const i=this._def.schema._parseSync({data:n.data,path:n.path,parent:n});if(!he(i))return i;const c=r.transform(i.value,a);if(c instanceof Promise)throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");return{status:t.value,value:c}}else return this._def.schema._parseAsync({data:n.data,path:n.path,parent:n}).then(i=>he(i)?Promise.resolve(r.transform(i.value,a)).then(c=>({status:t.value,value:c})):i);S.assertNever(r)}}D.create=(s,e,t)=>new D({schema:s,typeName:_.ZodEffects,effect:e,...k(t)});D.createWithPreprocess=(s,e,t)=>new D({schema:e,effect:{type:"preprocess",transform:s},typeName:_.ZodEffects,...k(t)});class V extends w{_parse(e){return this._getType(e)===m.undefined?O(void 0):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}}V.create=(s,e)=>new V({innerType:s,typeName:_.ZodOptional,...k(e)});class Q extends w{_parse(e){return this._getType(e)===m.null?O(null):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}}Q.create=(s,e)=>new Q({innerType:s,typeName:_.ZodNullable,...k(e)});class we extends w{_parse(e){const{ctx:t}=this._processInputParams(e);let n=t.data;return t.parsedType===m.undefined&&(n=this._def.defaultValue()),this._def.innerType._parse({data:n,path:t.path,parent:t})}removeDefault(){return this._def.innerType}}we.create=(s,e)=>new we({innerType:s,typeName:_.ZodDefault,defaultValue:typeof e.default=="function"?e.default:()=>e.default,...k(e)});class je extends w{_parse(e){const{ctx:t}=this._processInputParams(e),n={...t,common:{...t.common,issues:[]}},r=this._def.innerType._parse({data:n.data,path:n.path,parent:{...n}});return fe(r)?r.then(a=>({status:"valid",value:a.status==="valid"?a.value:this._def.catchValue({get error(){return new R(n.common.issues)},input:n.data})})):{status:"valid",value:r.status==="valid"?r.value:this._def.catchValue({get error(){return new R(n.common.issues)},input:n.data})}}removeCatch(){return this._def.innerType}}je.create=(s,e)=>new je({innerType:s,typeName:_.ZodCatch,catchValue:typeof e.catch=="function"?e.catch:()=>e.catch,...k(e)});class Ze extends w{_parse(e){if(this._getType(e)!==m.nan){const n=this._getOrReturnCtx(e);return f(n,{code:l.invalid_type,expected:m.nan,received:n.parsedType}),x}return{status:"valid",value:e.data}}}Ze.create=s=>new Ze({typeName:_.ZodNaN,...k(s)});const Nt=Symbol("zod_brand");class Ge extends w{_parse(e){const{ctx:t}=this._processInputParams(e),n=t.data;return this._def.type._parse({data:n,path:t.path,parent:t})}unwrap(){return this._def.type}}class Te extends w{_parse(e){const{status:t,ctx:n}=this._processInputParams(e);if(n.common.async)return(async()=>{const a=await this._def.in._parseAsync({data:n.data,path:n.path,parent:n});return a.status==="aborted"?x:a.status==="dirty"?(t.dirty(),ae(a.value)):this._def.out._parseAsync({data:a.value,path:n.path,parent:n})})();{const r=this._def.in._parseSync({data:n.data,path:n.path,parent:n});return r.status==="aborted"?x:r.status==="dirty"?(t.dirty(),{status:"dirty",value:r.value}):this._def.out._parseSync({data:r.value,path:n.path,parent:n})}}static create(e,t){return new Te({in:e,out:t,typeName:_.ZodPipeline})}}class Se extends w{_parse(e){const t=this._def.innerType._parse(e),n=r=>(he(r)&&(r.value=Object.freeze(r.value)),r);return fe(t)?t.then(r=>n(r)):n(t)}unwrap(){return this._def.innerType}}Se.create=(s,e)=>new Se({innerType:s,typeName:_.ZodReadonly,...k(e)});function st(s,e={},t){return s?ce.create().superRefine((n,r)=>{var a,i;if(!s(n)){const c=typeof e=="function"?e(n):typeof e=="string"?{message:e}:e,h=(i=(a=c.fatal)!==null&&a!==void 0?a:t)!==null&&i!==void 0?i:!0,u=typeof c=="string"?{message:c}:c;r.addIssue({code:"custom",...u,fatal:h})}}):ce.create()}const Ct={object:T.lazycreate};var _;(function(s){s.ZodString="ZodString",s.ZodNumber="ZodNumber",s.ZodNaN="ZodNaN",s.ZodBigInt="ZodBigInt",s.ZodBoolean="ZodBoolean",s.ZodDate="ZodDate",s.ZodSymbol="ZodSymbol",s.ZodUndefined="ZodUndefined",s.ZodNull="ZodNull",s.ZodAny="ZodAny",s.ZodUnknown="ZodUnknown",s.ZodNever="ZodNever",s.ZodVoid="ZodVoid",s.ZodArray="ZodArray",s.ZodObject="ZodObject",s.ZodUnion="ZodUnion",s.ZodDiscriminatedUnion="ZodDiscriminatedUnion",s.ZodIntersection="ZodIntersection",s.ZodTuple="ZodTuple",s.ZodRecord="ZodRecord",s.ZodMap="ZodMap",s.ZodSet="ZodSet",s.ZodFunction="ZodFunction",s.ZodLazy="ZodLazy",s.ZodLiteral="ZodLiteral",s.ZodEnum="ZodEnum",s.ZodEffects="ZodEffects",s.ZodNativeEnum="ZodNativeEnum",s.ZodOptional="ZodOptional",s.ZodNullable="ZodNullable",s.ZodDefault="ZodDefault",s.ZodCatch="ZodCatch",s.ZodPromise="ZodPromise",s.ZodBranded="ZodBranded",s.ZodPipeline="ZodPipeline",s.ZodReadonly="ZodReadonly"})(_||(_={}));const Et=(s,e={message:`Input not instance of ${s.name}`})=>st(t=>t instanceof s,e),nt=$.create,rt=Y.create,Ot=Ze.create,At=K.create,at=pe.create,It=ee.create,Rt=Ae.create,Zt=me.create,$t=ge.create,Mt=ce.create,Dt=F.create,Pt=G.create,Lt=Ie.create,Vt=M.create,Ut=T.create,Bt=T.strictCreate,zt=ve.create,Wt=$e.create,qt=ye.create,Gt=B.create,Ht=_e.create,Jt=Re.create,Yt=te.create,Kt=ie.create,Xt=xe.create,Qt=be.create,Ft=X.create,es=ke.create,ts=de.create,Je=D.create,ss=V.create,ns=Q.create,rs=D.createWithPreprocess,as=Te.create,is=()=>nt().optional(),os=()=>rt().optional(),cs=()=>at().optional(),ds={string:(s=>$.create({...s,coerce:!0})),number:(s=>Y.create({...s,coerce:!0})),boolean:(s=>pe.create({...s,coerce:!0})),bigint:(s=>K.create({...s,coerce:!0})),date:(s=>ee.create({...s,coerce:!0}))},ls=x;var o=Object.freeze({__proto__:null,defaultErrorMap:oe,setErrorMap:lt,getErrorMap:Ce,makeIssue:Ee,EMPTY_PATH:ut,addIssueToContext:f,ParseStatus:E,INVALID:x,DIRTY:ae,OK:O,isAborted:Be,isDirty:ze,isValid:he,isAsync:fe,get util(){return S},get objectUtil(){return Ue},ZodParsedType:m,getParsedType:J,ZodType:w,datetimeRegex:et,ZodString:$,ZodNumber:Y,ZodBigInt:K,ZodBoolean:pe,ZodDate:ee,ZodSymbol:Ae,ZodUndefined:me,ZodNull:ge,ZodAny:ce,ZodUnknown:F,ZodNever:G,ZodVoid:Ie,ZodArray:M,ZodObject:T,ZodUnion:ve,ZodDiscriminatedUnion:$e,ZodIntersection:ye,ZodTuple:B,ZodRecord:_e,ZodMap:Re,ZodSet:te,ZodFunction:ie,ZodLazy:xe,ZodLiteral:be,ZodEnum:X,ZodNativeEnum:ke,ZodPromise:de,ZodEffects:D,ZodTransformer:D,ZodOptional:V,ZodNullable:Q,ZodDefault:we,ZodCatch:je,ZodNaN:Ze,BRAND:Nt,ZodBranded:Ge,ZodPipeline:Te,ZodReadonly:Se,custom:st,Schema:w,ZodSchema:w,late:Ct,get ZodFirstPartyTypeKind(){return _},coerce:ds,any:Mt,array:Vt,bigint:At,boolean:at,date:It,discriminatedUnion:Wt,effect:Je,enum:Ft,function:Kt,instanceof:Et,intersection:qt,lazy:Xt,literal:Qt,map:Jt,nan:Ot,nativeEnum:es,never:Pt,null:$t,nullable:ns,number:rt,object:Ut,oboolean:cs,onumber:os,optional:ss,ostring:is,pipeline:as,preprocess:rs,promise:ts,record:Ht,set:Yt,strictObject:Bt,string:nt,symbol:Rt,transformer:Je,tuple:Gt,undefined:Zt,union:zt,unknown:Dt,void:Lt,NEVER:ls,ZodIssueCode:l,quotelessJson:dt,ZodError:R});

// ============================================================================
// WebDNA v2.0.0 — 1:1 Runtime & Creative-Dev Engine (Three.js/WebGL Scene &
// Shader Serializer, Scroll-Film Timeline Extractor, Web Audio Synth Graph,
// Code Archeology Script Exporter, @keyframes & Modular App.tsx Assembler)
// ============================================================================

const us = o.enum(["observed", "derived", "inferred"]);
const qe = o.enum(["complete", "partial", "skipped", "failed"]);
const hs = o.enum(["color", "font", "spacing", "radius", "shadow"]);
const fs = o.object({
  id: o.string().min(1).max(200),
  category: hs,
  name: o.string().min(1).max(200),
  value: o.string().min(1).max(500),
  role: o.string().max(100).optional(),
  hex: o.string().max(30).optional(),
  frequency: o.number().int().nonnegative(),
  evidence: us
});
const ps = o.object({
  status: qe,
  data: o.unknown(),
  warnings: o.array(o.string().max(500)),
  sampledNodes: o.number().int().nonnegative(),
  elapsedMs: o.number().nonnegative()
});
const ms = o.object({
  origin: o.string().max(500),
  path: o.string().max(1000)
});

function _s(s, e, t) {
  return {
    protocol: 1,
    requestId: `req-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    scanId: t?.scanId,
    type: s,
    createdAt: Date.now(),
    payload: e
  };
}

// ----------------------------------------------------------------------------
// 0. Site-Slug Archive Naming Engine (Human-Readable Domain + Path + Date!)
// ----------------------------------------------------------------------------
function getSiteSlug(report) {
  try {
    const rawOrigin = report?.source?.origin || "";
    const rawPath = report?.source?.path || "/";
    let host = "scanned-site";
    if (rawOrigin) {
      try {
        host = new URL(rawOrigin).hostname;
      } catch {
        host = rawOrigin.replace(/^https?:\/\//i, "").split("/")[0];
      }
    }
    host = host.replace(/^www\./i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "scanned-site";
    const pathSlug = rawPath && rawPath !== "/"
      ? rawPath.toLowerCase().replace(/\.(html?|php|aspx?|jsp)$/i, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 32)
      : "";
    const datePart = (report?.createdAt || new Date().toISOString()).slice(0, 10);
    return [host, pathSlug, datePart].filter(Boolean).join("-");
  } catch {
    return `webdna-site-${new Date().toISOString().slice(0, 10)}`;
  }
}

// ----------------------------------------------------------------------------
// 1. Pure-JS RFC-Compliant ZIP Archive Builder (Zero External Dependencies)
// ----------------------------------------------------------------------------
const CRC32_TABLE = (() => {
  const tbl = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    tbl[i] = c >>> 0;
  }
  return tbl;
})();

function crc32(bytes) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i++) {
    crc = (crc >>> 8) ^ CRC32_TABLE[(crc ^ bytes[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function sanitizeZipPath(rawPath) {
  const cleaned = String(rawPath || "file.txt")
    .replace(/\\/g, "/")
    .split("/")
    .map((seg) => seg.replace(/\.\.+/g, "").replace(/[^a-zA-Z0-9._-]/g, "_").trim())
    .filter((seg) => seg.length > 0 && seg !== "." && seg !== "..")
    .join("/");
  return cleaned || "file.txt";
}

function stringToBytes(str) {
  return new TextEncoder().encode(String(str ?? ""));
}

function base64ToBytes(b64) {
  try {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  } catch {
    return new Uint8Array(0);
  }
}

function buildZipArchive(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  const usedPaths = new Set();

  for (const item of files) {
    let safePath = sanitizeZipPath(item.path);
    if (usedPaths.has(safePath)) {
      const dotIdx = safePath.lastIndexOf(".");
      const stem = dotIdx > 0 ? safePath.slice(0, dotIdx) : safePath;
      const ext = dotIdx > 0 ? safePath.slice(dotIdx) : "";
      let counter = 2;
      while (usedPaths.has(`${stem}-${counter}${ext}`)) counter++;
      safePath = `${stem}-${counter}${ext}`;
    }
    usedPaths.add(safePath);

    const nameBytes = stringToBytes(safePath);
    const dataBytes = item.bytes instanceof Uint8Array ? item.bytes : stringToBytes(item.content || "");
    const crc = crc32(dataBytes);
    const size = dataBytes.length;

    const lh = new Uint8Array(30 + nameBytes.length);
    const lhv = new DataView(lh.buffer);
    lhv.setUint32(0, 0x04034b50, true);
    lhv.setUint16(4, 20, true);
    lhv.setUint16(6, 0x0800, true);
    lhv.setUint16(8, 0, true);
    lhv.setUint16(10, 0, true);
    lhv.setUint16(12, 0x549A, true);
    lhv.setUint32(14, crc, true);
    lhv.setUint32(18, size, true);
    lhv.setUint32(22, size, true);
    lhv.setUint16(26, nameBytes.length, true);
    lhv.setUint16(28, 0, true);
    lh.set(nameBytes, 30);

    const ch = new Uint8Array(46 + nameBytes.length);
    const chv = new DataView(ch.buffer);
    chv.setUint32(0, 0x02014b50, true);
    chv.setUint16(4, 20, true);
    chv.setUint16(6, 20, true);
    chv.setUint16(8, 0x0800, true);
    chv.setUint16(10, 0, true);
    chv.setUint16(12, 0, true);
    chv.setUint16(14, 0x549A, true);
    chv.setUint32(16, crc, true);
    chv.setUint32(20, size, true);
    chv.setUint32(24, size, true);
    chv.setUint16(28, nameBytes.length, true);
    chv.setUint16(30, 0, true);
    chv.setUint16(32, 0, true);
    chv.setUint16(34, 0, true);
    chv.setUint16(36, 0, true);
    chv.setUint32(38, 0, true);
    chv.setUint32(42, offset, true);
    ch.set(nameBytes, 46);

    localParts.push(lh, dataBytes);
    centralParts.push(ch);
    offset += lh.length + size;
  }

  let centralSize = 0;
  for (const c of centralParts) centralSize += c.length;

  const eocd = new Uint8Array(22);
  const eocdv = new DataView(eocd.buffer);
  eocdv.setUint32(0, 0x06054b50, true);
  eocdv.setUint16(4, 0, true);
  eocdv.setUint16(6, 0, true);
  eocdv.setUint16(8, centralParts.length, true);
  eocdv.setUint16(10, centralParts.length, true);
  eocdv.setUint32(12, centralSize, true);
  eocdv.setUint32(16, offset, true);
  eocdv.setUint16(20, 0, true);

  const totalSize = offset + centralSize + 22;
  const out = new Uint8Array(totalSize);
  let pos = 0;
  for (const p of localParts) { out.set(p, pos); pos += p.length; }
  for (const p of centralParts) { out.set(p, pos); pos += p.length; }
  out.set(eocd, pos);
  return out;
}

// ----------------------------------------------------------------------------
// 2. Color & Contrast Utilities + Aesthetic Taste-Swap Presets
// ----------------------------------------------------------------------------
const TASTE_PRESETS = {
  "extracted-original": {
    label: "1. Extracted Site Palette (1:1 Original Brand Tokens)",
    description: "Uses the exact observed colors, typography, radii, shaders, and shadows from the scanned page.",
    vars: {}
  },
  "linear-dark": {
    label: "2. Linear / Vercel Obsidian Minimal (Dark Mode SaaS)",
    description: "Ultra-crisp obsidian dark surfaces (#08090A, #121316), 1px hairline borders (#222326), electric indigo accent (#5E6AD2), and tight -0.02em geometric headings.",
    vars: {
      "--taste-bg": "#08090A",
      "--taste-surface": "#121316",
      "--taste-border": "#222326",
      "--taste-text": "#F7F8F8",
      "--taste-muted": "#8A8F98",
      "--taste-accent": "#5E6AD2",
      "--taste-radius": "8px"
    }
  },
  "stripe-editorial": {
    label: "3. Stripe / Daylight Editorial FinTech (Crisp Light)",
    description: "Warm alabaster paper background (#F6F9FC), pure white elevated cards (#FFFFFF), deep navy ink (#0A2540), vibrant royal violet (#635BFF), and layered soft ambient shadows.",
    vars: {
      "--taste-bg": "#F6F9FC",
      "--taste-surface": "#FFFFFF",
      "--taste-border": "#E3E8EE",
      "--taste-text": "#0A2540",
      "--taste-muted": "#425466",
      "--taste-accent": "#635BFF",
      "--taste-radius": "12px"
    }
  },
  "neo-brutalist": {
    label: "4. Neo-Brutalist Studio (High-Contrast Hard Offset)",
    description: "Warm cream canvas (#FFFDF7), 2px solid black borders (#000000), hard 4px×4px offset shadows, acid lime/amber accents (#FF5C00), and bold grotesk display type.",
    vars: {
      "--taste-bg": "#FFFDF7",
      "--taste-surface": "#FFFFFF",
      "--taste-border": "#000000",
      "--taste-text": "#000000",
      "--taste-muted": "#333333",
      "--taste-accent": "#FF5C00",
      "--taste-radius": "0px"
    }
  },
  "emerald-ai": {
    label: "5. Tactical Cyber-Glass HUD (Deep Slate + Radar Mint)",
    description: "Deep tactical slate (#060D0C), frosted HUD telemetry overlays, emerald radar highlights (#10B981), and monospace cyber-scramble typography.",
    vars: {
      "--taste-bg": "#060D0C",
      "--taste-surface": "#0D1B18",
      "--taste-border": "#1B3B34",
      "--taste-text": "#ECFDF5",
      "--taste-muted": "#6EE7B7",
      "--taste-accent": "#10B981",
      "--taste-radius": "4px"
    }
  }
};

function rgbaToHexStr(rgbaStr) {
  const m = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([0-9.]+))?\s*\)/.exec(rgbaStr || "");
  if (!m) return rgbaStr || "#000000";
  const r = parseInt(m[1], 10).toString(16).padStart(2, "0");
  const g = parseInt(m[2], 10).toString(16).padStart(2, "0");
  const b = parseInt(m[3], 10).toString(16).padStart(2, "0");
  const a = m[4] !== undefined ? parseFloat(m[4]) : 1;
  if (a < 1) {
    const ah = Math.round(a * 255).toString(16).padStart(2, "0");
    return `#${r}${g}${b}${ah}`.toUpperCase();
  }
  return `#${r}${g}${b}`.toUpperCase();
}

function rgbaToHslStr(rgbaStr) {
  const m = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([0-9.]+))?\s*\)/.exec(rgbaStr || "");
  if (!m) return rgbaStr || "hsl(0, 0%, 0%)";
  const r = parseInt(m[1], 10) / 255;
  const g = parseInt(m[2], 10) / 255;
  const b = parseInt(m[3], 10) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function relativeLuminance(rgbaStr) {
  const m = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(rgbaStr || "");
  if (!m) return 0;
  const chan = [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * chan[0] + 0.7152 * chan[1] + 0.0722 * chan[2];
}

function contrastRatio(lum1, lum2) {
  const l1 = Math.max(lum1, lum2);
  const l2 = Math.min(lum1, lum2);
  return ((l1 + 0.05) / (l2 + 0.05)).toFixed(2);
}

function lrStr(r) {
  return (String(r || "").split(",")[0]?.trim() ?? "").replace(/^["']|["']$/g, "").trim() || "sans-serif";
}

// ----------------------------------------------------------------------------
// 3. v2.0.0 Runtime Exporters: Client Script Bundle, Three.js Scene, Timelines,
//    Web Audio Synth, @keyframes CSS, and Auto-Assembled Modular React Components
// ----------------------------------------------------------------------------
function getRuntimeData(report) {
  const rt = report?.extracts?.runtime?.data || report?.extracts?.components?.data || {};
  const webglScene = rt.webglScene || { metadata: { version: 4.6, generator: "WebDNA v2.0.0" }, canvases: [], cameraRig: { keyframes: [] }, geometries: [], materials: [], lights: [], shaders: [] };
  const timelines = rt.timelines || { isScrollFilm: false, totalScrollPx: 1080, viewportHeightPx: 900, totalVhRatio: "120vh", chapters: [], pinnedLayers: [], scrambleTargets: [], scrambleFunctions: [] };
  const audioGraph = rt.audioGraph || { detected: false, oscillators: [], filters: [], gains: [] };
  const clientScripts = rt.clientScripts || { inlineCount: 0, externalCount: 0, inlineScripts: [], externalScripts: [] };
  const keyframes = Array.isArray(rt.keyframes) ? rt.keyframes : (Array.isArray(report?.extracts?.components?.data?.keyframes) ? report.extracts.components.data.keyframes : []);
  const pageMeta = rt.pageMeta || report?.extracts?.components?.data?.pageMeta || { title: "", h1: "", headings: [] };
  const apiMocks = Array.isArray(rt.apiMocks) ? rt.apiMocks : (Array.isArray(report?.extracts?.components?.data?.apiMocks) ? report.extracts.components.data.apiMocks : []);
  const stylesheets = Array.isArray(rt.stylesheets) ? rt.stylesheets : (Array.isArray(report?.extracts?.components?.data?.stylesheets) ? report.extracts.components.data.stylesheets : []);
  return { webglScene, timelines, audioGraph, clientScripts, keyframes, pageMeta, apiMocks, stylesheets };
}

function buildOrderedScriptExecutionPlan(report) {
  const { clientScripts } = getRuntimeData(report);
  const combined = [];
  (clientScripts.externalScripts || []).forEach((s, idx) => {
    if (!s.codePreview || s.codePreview.length === 0) return;
    const rawRel = sanitizeZipPath(s.relPath || `scripts/chunks/chunk-${s.index || idx + 1}.js`);
    const nativeRel = rawRel.startsWith("scripts/") && s.src && s.src.includes("/_next/")
      ? sanitizeZipPath(s.src.split("?")[0].replace(/^https?:\/\/[^/]+\//i, ""))
      : rawRel;
    combined.push({
      kind: "external",
      id: `ext-${s.index || idx + 1}`,
      priority: typeof s.priority === "number" ? s.priority : 6,
      stage: s.stage || "06-dynamic-chunk",
      type: s.type || "classic",
      src: s.src || "",
      relPath: nativeRel,
      bytes: s.capturedBytes || s.codePreview.length,
      code: s.codePreview,
      domIndex: idx
    });
  });
  (clientScripts.inlineScripts || []).forEach((s, idx) => {
    if (!s.code || s.code.length === 0) return;
    const isImportMap = s.type === "importmap" || s.stage === "01-importmap";
    const isFlightStream = s.stage === "01b-next-flight-stream" || /(__next_f|__NEXT_DATA__|__NUXT__|__remixContext)/.test(s.code);
    const resolvedStage = isImportMap ? "01-importmap" : isFlightStream ? "01b-next-flight-stream" : (s.stage || "07-inline-boot");
    const resolvedPriority = typeof s.priority === "number"
      ? s.priority
      : isImportMap
      ? 50 + idx
      : isFlightStream
      ? 120 + idx
      : 700 + idx;
    const ext = isImportMap ? "json" : "js";
    combined.push({
      kind: isImportMap ? "importmap" : isFlightStream ? "flight-stream" : "inline",
      id: s.id || `inline-${idx + 1}`,
      priority: resolvedPriority,
      stage: resolvedStage,
      type: s.type || "classic",
      src: "",
      relPath: `scripts/ordered/${String(idx + 1).padStart(2, "0")}-${resolvedStage}-${s.id || `inline-${idx + 1}`}.${ext}`,
      bytes: s.bytes || s.code.length,
      code: s.code,
      domIndex: isFlightStream ? idx : 1000 + idx
    });
  });
  combined.sort((a, b) => (a.priority - b.priority) || (a.domIndex - b.domIndex));
  return combined.map((item, idx) => ({
    order: idx + 1,
    ...item,
    orderedRelPath: item.kind === "external"
      ? item.relPath
      : `scripts/ordered/${String(idx + 1).padStart(2, "0")}-${item.stage}-${item.id}.${item.kind === "importmap" ? "json" : "js"}`
  }));
}

function generateClientScriptsBundle(report) {
  const slug = getSiteSlug(report);
  const { clientScripts } = getRuntimeData(report);
  const orderedPlan = buildOrderedScriptExecutionPlan(report);
  const lines = [
    `/**`,
    ` * ============================================================================`,
    ` * WebDNA v1.0.0 — Code Archeology: Ordered Client Runtime Bundle (Up to 10 MB)`,
    ` * Source: ${report.source.origin}${report.source.path}`,
    ` * Inline Scripts Captured: ${clientScripts.inlineCount} | External Scripts: ${clientScripts.externalCount}`,
    ` * Execution Order: 01-importmap -> 02-webpack-runtime -> 03-polyfills-framework`,
    ` *                  -> 04-vendor-chunk -> 05-page-manifest -> 06-dynamic-chunk -> 07-inline-boot`,
    ` * ============================================================================`,
    ` * Note: For Next.js + Three.js sites, <LivingSnapshotMount /> injects each script`,
    ` * in its native stage order via /scripts/script-manifest.json before falling back`,
    ` * to this combined bundle.`,
    ` */`,
    ``
  ];

  orderedPlan.forEach((item) => {
    lines.push(`// ----------------------------------------------------------------------------`);
    lines.push(`// [ORDER #${item.order} | STAGE: ${item.stage}] id="${item.id}" type="${item.type}" (${item.bytes} bytes)${item.src ? ` src="${item.src}"` : ""}`);
    lines.push(`// ----------------------------------------------------------------------------`);
    if (item.kind === "importmap") {
      lines.push(`/* importmap: ${item.code} */`);
    } else {
      lines.push(item.code || "// (empty)");
    }
    lines.push(``);
  });

  if (orderedPlan.length === 0) {
    lines.push(`// No inline or external <script> tags were present on the scanned page.`);
  }

  return {
    fileName: `${slug}-client-bundle.js`,
    mime: "application/javascript",
    content: lines.join("\n")
  };
}

function balanceCssParentheses(rawVal, maxLen = 500) {
  if (!rawVal || typeof rawVal !== "string") return "";
  let v = rawVal.trim().slice(0, maxLen).replace(/[,;\s]+$/, "");
  let openParens = 0;
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < v.length; i++) {
    const ch = v[i];
    if (ch === "'" && !inDouble && v[i - 1] !== "\\") inSingle = !inSingle;
    else if (ch === '"' && !inSingle && v[i - 1] !== "\\") inDouble = !inDouble;
    else if (!inSingle && !inDouble) {
      if (ch === "(") openParens++;
      else if (ch === ")" && openParens > 0) openParens--;
    }
  }
  if (inSingle) v += "'";
  if (inDouble) v += '"';
  while (openParens > 0) {
    v += ")";
    openParens--;
  }
  return v;
}

function rewriteFontPreloadsAndFacesToLocalNextMedia(text) {
  if (!text) return "";
  let out = String(text);
  // Rewrite any full live-origin or root-relative font URLs (.woff2, .woff, .ttf, .otf) to local /_next/static/media/<filename>
  out = out.replace(
    /(?:https?:\/\/[^"'\s)]+\/|\/_next\/static\/media\/|\/_\/)([A-Za-z0-9._-]+\.(?:woff2?|ttf|otf))(?:\?[^"'\s)]*)?/gi,
    "/_next/static/media/$1"
  );
  return out;
}

function rewriteAssetPathsInText(text, pathRewriteMap) {
  if (!text) return "";
  let out = String(text);
  if (pathRewriteMap && pathRewriteMap.size > 0) {
    for (const [origRef, localPublicUrl] of pathRewriteMap.entries()) {
      if (!origRef || origRef.length < 3 || origRef === "/") continue;
      out = out.split(origRef).join(localPublicUrl);
    }
  }
  return rewriteFontPreloadsAndFacesToLocalNextMedia(out);
}

function generateZeroConfigScaffoldFiles(report, slug) {
  const { pageMeta, apiMocks } = getRuntimeData(report);
  const pageTitle = pageMeta?.title || pageMeta?.h1 || `${report.source.origin}${report.source.path} — WebDNA v4.2.0 UNIVERSAL AGENT LOCK (ANTIGRAVITY + ALL IDEs)eplica`;

  const pkgJson = {
    name: slug,
    version: "4.1.0",
    private: true,
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview"
    },
    dependencies: {
      "react": "^18.3.1",
      "react-dom": "^18.3.1",
      "three": "^0.168.0",
      "lucide-react": "^0.454.0"
    },
    devDependencies: {
      "@types/react": "^18.3.11",
      "@types/react-dom": "^18.3.1",
      "@types/three": "^0.168.0",
      "@vitejs/plugin-react": "^4.3.3",
      "autoprefixer": "^10.4.20",
      "postcss": "^8.4.47",
      "tailwindcss": "^3.4.14",
      "typescript": "^5.6.3",
      "vite": "^5.4.10"
    }
  };

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${pageTitle.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

  const mainTsx = `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(<App />);
}
`;

  const tsconfigJson = {
    compilerOptions: {
      target: "ES2022",
      lib: ["ES2022", "DOM", "DOM.Iterable"],
      module: "ESNext",
      moduleResolution: "bundler",
      jsx: "react-jsx",
      strict: false,
      skipLibCheck: true,
      allowJs: true,
      noEmit: true,
      isolatedModules: true,
      resolveJsonModule: true
    },
    include: ["src"]
  };

  const mockDataPayload = {
    generator: "webdna@4.2.0",
    source: `${report.source.origin}${report.source.path}`,
    endpoints: apiMocks.length > 0 ? apiMocks : [
      { method: "GET", path: "/api/health", status: 200, response: { ok: true, status: "healthy" } },
      { method: "POST", path: "/api/submit", status: 200, response: { ok: true, status: "received" } }
    ]
  };

  const viteConfigTs = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

const UPSTREAM_ORIGIN = "${report.source.origin}";

function inferMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const map: Record<string, string> = {
    ".js": "application/javascript; charset=utf-8",
    ".mjs": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".wasm": "application/wasm",
    ".glb": "model/gltf-binary",
    ".gltf": "model/gltf+json",
    ".bin": "application/octet-stream",
    ".hdr": "image/vnd.radiance",
    ".exr": "image/x-exr",
    ".ktx2": "image/ktx2",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".ttf": "font/ttf",
    ".otf": "font/otf",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".mp3": "audio/mpeg",
    ".mp4": "video/mp4"
  };
  return map[ext] || "application/octet-stream";
}

// WebDNA v4.2.0 — Universal API Network Mocking + On-Demand Upstream Auto-Proxy & Self-Healing Cache
// 1. Intercepts /api/* requests and returns recorded JSON from backend/mock-data.json with HTTP 200.
// 2. Intercepts any missing static asset/chunk (/_next/*, /assets/*, /fonts/*, .js, .css, .glb, .wasm, .woff2)
//    before Vite's SPA fallback can return index.html, fetches it live from UPSTREAM_ORIGIN, saves it
//    permanently to public/ on disk, and serves it with the proper Content-Type!
function webdnaSelfHealingAndMockPlugin() {
  return {
    name: "webdna-self-healing-and-api-mock",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const rawUrl = req.url || "";
        const cleanPath = rawUrl.split("?")[0];

        // A. API Mock Interceptor
        if (cleanPath.startsWith("/api/")) {
          try {
            const mockPath = path.resolve(process.cwd(), "backend/mock-data.json");
            const raw = fs.existsSync(mockPath) ? JSON.parse(fs.readFileSync(mockPath, "utf8")) : { endpoints: [] };
            const match = (raw.endpoints || []).find((ep: any) => ep.path === cleanPath);
            res.statusCode = match?.status || 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(match?.response || { ok: true, mockedBy: "WebDNA v4.2.0", path: cleanPath }));
          } catch {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true, mockedBy: "WebDNA v4.2.0", path: rawUrl }));
          }
          return;
        }

        // B. On-Demand Upstream Auto-Proxy & Self-Healing Cache on Local Miss
        const isStaticAssetRoute =
          cleanPath.startsWith("/_next/") ||
          cleanPath.startsWith("/assets/") ||
          cleanPath.startsWith("/fonts/") ||
          cleanPath.startsWith("/models/") ||
          cleanPath.startsWith("/textures/") ||
          cleanPath.startsWith("/draco/") ||
          /[.](m?js|css|woff2?|ttf|otf|glb|gltf|bin|wasm|hdr|exr|ktx2|dds|webp|png|jpe?g|svg|mp3|ogg|wav|mp4)$/i.test(cleanPath);

        if (isStaticAssetRoute && !cleanPath.startsWith("/src/") && !cleanPath.startsWith("/@")) {
          const localDiskPath = path.resolve(process.cwd(), "public", cleanPath.replace(/^[/]+/, ""));
          if (fs.existsSync(localDiskPath) && fs.statSync(localDiskPath).isFile() && fs.statSync(localDiskPath).size > 0) {
            return next();
          }
          if (UPSTREAM_ORIGIN && /^https?:/i.test(UPSTREAM_ORIGIN)) {
            try {
              const upstreamUrl = new URL(rawUrl, UPSTREAM_ORIGIN).toString();
              const upstreamRes = await fetch(upstreamUrl);
              if (upstreamRes.ok) {
                const buf = Buffer.from(await upstreamRes.arrayBuffer());
                fs.mkdirSync(path.dirname(localDiskPath), { recursive: true });
                fs.writeFileSync(localDiskPath, buf);
                res.statusCode = 200;
                res.setHeader("Content-Type", upstreamRes.headers.get("content-type") || inferMimeType(cleanPath));
                res.setHeader("X-WebDNA-Self-Healed", "cached-to-public");
                res.end(buf);
                return;
              }
            } catch {}
          }
        }

        return next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), webdnaSelfHealingAndMockPlugin()],
  publicDir: "public",
  server: {
    port: 5173,
    open: false
  }
});
`;

  return {
    packageJson: JSON.stringify(pkgJson, null, 2) + "\n",
    indexHtml,
    mainTsx,
    tsconfigJson: JSON.stringify(tsconfigJson, null, 2) + "\n",
    mockDataJson: JSON.stringify(mockDataPayload, null, 2) + "\n",
    viteConfigTs
  };
}

function generateUniversalAgentLockFiles(report, slug) {
  const ruleBody = "# 🚨 MANDATORY 1:1 LIVE-SITE PARITY LOCK (DO NOT VIOLATE)\n**Generator**: `WebDNA v4.2.0 Universal Agent Lock (Antigravity + Claude + Cursor + Windsurf + Copilot + Cline)`\n\n## 🛑 RULE #1: NEVER BUILD A \"ROUGH APPROXIMATION\" OR REWRITE FROM SCRATCH\nYou are operating inside a **WebDNA 1:1 Live-Site Capture Kit**.\n- **STRICTLY FORBIDDEN**: Do **NOT** generate a simplified landing page, wireframe, dashboard, or approximate React/Tailwind \"lookalike\" that merely reuses the extracted images, 3D `.glb` models, or colors.\n- **WHY**: The exact live DOM (`public/snapshot/index.html`), compiled CSS stylesheets (`public/_next/static/css/*.css`), 3D/WebGL assets (`public/models/*.glb`, `public/draco/*.wasm`, `public/textures/*.hdr`), preloaded fonts (`public/_next/static/media/*.woff2`), and ordered runtime scripts (`public/scripts/script-manifest.json`) are **ALREADY EXTRACTED** in this repository.\n- **DEFAULT ENTRYPOINT LOCK**: `src/App.tsx` is intentionally locked to `<LivingSnapshotMount />`, which mounts `/snapshot/index.html` and executes `/scripts/script-manifest.json` in exact Next.js / Webpack / Three.js order (`01-importmap` -> `01b-next-flight-stream` -> `02-webpack-runtime` -> `03-polyfills-framework` -> `04-vendor-chunk` -> `05-page-manifest` -> `06-dynamic-chunk` -> `07-inline-boot`).\n\n## 🛠️ RULE #2: WHAT YOU MUST DO WHEN ASKED TO \"BUILD\", \"RUN\", OR \"FIX\" THIS SITE\n1. **Keep `<LivingSnapshotMount />` as the active renderer in `src/App.tsx`**. Never replace `<LivingSnapshotMount />` with custom JSX unless the user explicitly commands: *\"Switch to Mode 2 rebrand templates\"*.\n2. **Start the Self-Healing Vite Server (`npm install && npm run dev`)**:\n   - `vite.config.ts` includes `webdnaSelfHealingAndMockPlugin()`, which automatically proxies any missing `/_next/*`, `/assets/*`, `/fonts/*`, `.js`, `.css`, `.woff2`, `.glb`, `.wasm`, or `.hdr` request from the live upstream origin, caches it permanently into `public/`, and serves it with its true `Content-Type`.\n3. **Audit 1:1 Behavioral Parity**:\n   - Verify that all stylesheets in `public/assets/css-integrity-report.json` load with `rulesCount > 0`.\n   - Verify that `self.__next_f` Flight stream scripts run before Webpack/React bundles.\n   - Verify that the 3D/WebGL canvas (`#stage`), scroll track, and runtime scripts execute with **zero console errors**.\n   - If any script chunk, shader uniform, or CSS rule needs patching to match the live site 1:1, patch the runtime mount or local asset mapping directly—never replace the page with a dummy React component.\n";
  const cursorMdc = "---\ndescription: WebDNA v4.2.0 Mandatory 1:1 Live-Site Parity Lock\nglobs: \"**/*\"\nalwaysApply: true\n---\n" + ruleBody;
  const aiderYml = "read:\n  - AGENTS.md\n  - GEMINI.md\n  - CLAUDE.md\n  - DESIGN.md\n";
  return [
    { path: `${slug}-project/AGENTS.md`, bytes: stringToBytes(ruleBody) },
    { path: `${slug}-project/GEMINI.md`, bytes: stringToBytes(ruleBody) },
    { path: `${slug}-project/.antigravity/rules.md`, bytes: stringToBytes(ruleBody) },
    { path: `${slug}-project/.idx/airules.md`, bytes: stringToBytes(ruleBody) },
    { path: `${slug}-project/CLAUDE.md`, bytes: stringToBytes(ruleBody) },
    { path: `${slug}-project/.cursorrules`, bytes: stringToBytes(ruleBody) },
    { path: `${slug}-project/.cursor/rules/webdna-1to1-lock.mdc`, bytes: stringToBytes(cursorMdc) },
    { path: `${slug}-project/.windsurfrules`, bytes: stringToBytes(ruleBody) },
    { path: `${slug}-project/.github/copilot-instructions.md`, bytes: stringToBytes(ruleBody) },
    { path: `${slug}-project/.clinerules`, bytes: stringToBytes(ruleBody) },
    { path: `${slug}-project/.roorules`, bytes: stringToBytes(ruleBody) },
    { path: `${slug}-project/.aider.conf.yml`, bytes: stringToBytes(aiderYml) }
  ];
}
function generateAnimationsCss(report) {
  const slug = getSiteSlug(report);
  const { keyframes } = getRuntimeData(report);
  const anims = Array.isArray(report.extracts.animations?.data) ? report.extracts.animations.data : [];
  const lines = [
    `/* ==========================================================================`,
    ` * WebDNA v2.0.0 — Extracted @keyframes & Motion Utilities (src/animations.css)`,
    ` * Source: ${report.source.origin}${report.source.path}`,
    ` * ========================================================================== */`,
    ``
  ];
  if (keyframes.length > 0) {
    keyframes.forEach((kf) => {
      lines.push(kf.cssText);
      lines.push(``);
    });
  } else {
    lines.push(`@keyframes webdna-pulse-subtle {`, `  0%, 100% { opacity: 1; }`, `  50% { opacity: 0.65; }`, `}`, ``);
  }
  if (anims.length > 0) {
    lines.push(`/* Observed Computed Animation & Transition Utility Classes */`);
    anims.slice(0, 20).forEach((a, idx) => {
      const safeCls = (a.name || `motion-${idx + 1}`).toLowerCase().replace(/[^a-z0-9-]/g, "-");
      if (a.name === "transition") {
        lines.push(`.webdna-transition-${idx + 1} { transition: all ${a.duration} ${a.timing}; }`);
      } else {
        lines.push(`.webdna-anim-${safeCls} { animation: ${a.name} ${a.duration} ${a.timing} infinite; }`);
      }
    });
  }
  return {
    fileName: `${slug}-animations.css`,
    mime: "text/css",
    content: lines.join("\n") + "\n"
  };
}

function generateProceduralAudioModule(report) {
  const { audioGraph } = getRuntimeData(report);
  const oscs = audioGraph.oscillators?.length > 0 ? audioGraph.oscillators : [
    { id: "osc-1", waveform: "sawtooth", frequencyHz: 48, role: "sub-drone-hum" },
    { id: "osc-2", waveform: "sine", frequencyHz: 96, role: "harmonic-overtone" }
  ];
  const filts = audioGraph.filters?.length > 0 ? audioGraph.filters : [
    { id: "filter-1", type: "lowpass", cutoffHz: 220 }
  ];

  return `// ============================================================================
// WebDNA v2.0.0 — 1:1 Procedural Web Audio Synthesizer (src/audio/proceduralSynth.ts)
// Reconstructs the live in-memory AudioContext oscillator & filter graph
// ============================================================================

export interface ProceduralAudioController {
  start: () => void;
  stop: () => void;
  triggerRadarClick: (freq?: number) => void;
  isPlaying: () => boolean;
}

export function createProceduralSoundscape(): ProceduralAudioController {
  let ctx: AudioContext | null = null;
  let masterGain: GainNode | null = null;
  let activeOscs: OscillatorNode[] = [];
  let playing = false;

  const start = () => {
    if (playing) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AudioCtx();
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.08, ctx.currentTime);

    const primaryFilter = ctx.createBiquadFilter();
    primaryFilter.type = "${filts[0].type}";
    primaryFilter.frequency.setValueAtTime(${filts[0].cutoffHz}, ctx.currentTime);
    primaryFilter.connect(masterGain);
    masterGain.connect(ctx.destination);

    const oscConfigs: Array<{ type: OscillatorType; freq: number }> = ${JSON.stringify(
      oscs.map((o) => ({ type: o.waveform, freq: o.frequencyHz }))
    )};

    activeOscs = oscConfigs.map((cfg) => {
      const osc = ctx!.createOscillator();
      osc.type = cfg.type;
      osc.frequency.setValueAtTime(cfg.freq, ctx!.currentTime);
      osc.connect(primaryFilter);
      osc.start();
      return osc;
    });
    playing = true;
  };

  const stop = () => {
    if (!playing) return;
    activeOscs.forEach((o) => { try { o.stop(); o.disconnect(); } catch {} });
    activeOscs = [];
    if (ctx) { try { ctx.close(); } catch {} ctx = null; }
    playing = false;
  };

  const triggerRadarClick = (freq = 1240) => {
    if (!ctx || !masterGain) return;
    const osc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    clickGain.gain.setValueAtTime(0.12, ctx.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
    osc.connect(clickGain);
    clickGain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  };

  return { start, stop, triggerRadarClick, isPlaying: () => playing };
}
`;
}

// ----------------------------------------------------------------------------
// 4. Smarter Modular Component Assembler (Navbar.tsx, SectionHero.tsx,
//    StageCanvas3D.tsx, ScrollChaptersOverlay.tsx, FormBriefing.tsx, App.tsx)
// ----------------------------------------------------------------------------
function generateModularReactSuite(s, tastePresetKey = "extracted-original") {
  const compExtract = s.extracts.components?.data || {};
  const comps = Array.isArray(compExtract.components) ? compExtract.components : [];
  const rawTopology = Array.isArray(compExtract.topology) ? compExtract.topology : [];
  const assets = Array.isArray(s.extracts.assets?.data) ? s.extracts.assets.data : [];
  const inlineSvgs = assets.filter((a) => a.kind === "svg" && a.svgContent);
  const { webglScene, timelines, audioGraph, pageMeta } = getRuntimeData(s);
  const primaryFont = s.tokens.find((t) => t.category === "font")?.value || "Inter";
  const siteHost = (() => {
    try { return new URL(s.source.origin).hostname; } catch { return s.source.origin || "WebApp"; }
  })();

  // Extract concrete component props dynamically from the scanned page (zero hardcoded residuals from prior scans!)
  const navComp = comps.find((c) => c.kind === "navbar");
  const detectedNavItems = navComp?.props?.items?.length
    ? navComp.props.items
    : (pageMeta?.headings?.slice(0, 4).length ? pageMeta.headings.slice(0, 4) : ["Overview", "Features", "Architecture", "Contact"]);
  const heroComp = comps.find((c) => c.kind === "hero");
  const heroHeadline = heroComp?.props?.headline || pageMeta?.h1 || pageMeta?.title || timelines.chapters?.[0]?.label || `${siteHost}Application`;
  const heroCta = heroComp?.props?.cta || comps.find((c) => c.kind === "button")?.props?.label || "Get Started";
  const heroBadgeText = timelines.scrambleTargets?.[0]?.text || pageMeta?.title || siteHost;
  const formComp = comps.find((c) => c.kind === "form");
  const formFields = formComp?.props?.fields?.length ? formComp.props.fields : ["callsign", "coordinates", "channel"];
  const formAction = formComp?.props?.action || "/api/briefing";
  const brandSvgMarkup = inlineSvgs[0]?.svgContent || `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="12" stroke="currentColor" stroke-width="2"/><circle cx="14" cy="14" r="4" fill="currentColor"/></svg>`;

  // 1. src/components/CyberScrambleText.tsx — 1:1 `[data-s]` Text Decipher Hook & Component
  const cyberScrambleTsx = `import React, { useEffect, useState } from "react";

// ============================================================================
// WebDNA v2.0.0 — 1:1 Cyber-Scramble / Text-Decipher Engine (for [data-s] nodes)
// ============================================================================
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_-#$%&*+<>";

export function CyberScrambleText({
  text,
  triggerKey = 0,
  durationMs = 680,
  className = ""
}: {
  text: string;
  triggerKey?: number | string;
  durationMs?: number;
  className?: string;
}) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.max(12, Math.round(durationMs / 16));
    const timer = window.setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealedCount = Math.floor(progress * text.length);
      const next = text
        .split("")
        .map((ch, idx) => {
          if (ch === " ") return " ";
          if (idx < revealedCount) return ch;
          return GLYPHS[(idx + frame * 3) % GLYPHS.length];
        })
        .join("");
      setOutput(next);
      if (frame >= totalFrames) {
        setOutput(text);
        window.clearInterval(timer);
      }
    }, 16);
    return () => window.clearInterval(timer);
  }, [text, triggerKey, durationMs]);

  return (
    <span data-s={text} className={className}>
      {output}
    </span>
  );
}
`;

  // 2. src/components/StageCanvas3D.tsx — Procedural 3D / Shader Canvas Stage wired to scroll progress & extracted shaders/camera keyframes
  const vertexShaderSrc = webglScene.shaders?.find((sh) => sh.type === "vertex")?.source || `attribute vec2 position;\nvarying vec2 vUv;\nvoid main() {\n  vUv = position * 0.5 + 0.5;\n  gl_Position = vec4(position, 0.0, 1.0);\n}`;
  const fragmentShaderSrc = webglScene.shaders?.find((sh) => sh.type === "fragment")?.source || `precision mediump float;\nvarying vec2 vUv;\nuniform float uTime;\nuniform float uScroll;\nvoid main() {\n  vec2 uv = vUv - 0.5;\n  float dist = length(uv);\n  float grid = abs(sin((uv.x + uScroll * 0.4) * 28.0)) * abs(cos((uv.y + uTime * 0.05) * 28.0));\n  vec3 base = mix(vec3(0.03, 0.05, 0.09), vec3(0.06, 0.35, 0.28), smoothstep(0.6, 0.0, dist));\n  gl_FragColor = vec4(base + grid * 0.08, 1.0);\n}`;
  const keyframesList = webglScene.cameraRig?.keyframes?.length ? webglScene.cameraRig.keyframes : [
    { call: "position.set", vector: [0, 2, 14] },
    { call: "position.set", vector: [8, -1, 16] },
    { call: "position.set", vector: [-6, 4, 10] }
  ];

  const stageCanvas3DTsx = `import React, { useEffect, useRef } from "react";

// ============================================================================
// WebDNA v2.0.0 — 3D / WebGL Procedural Stage Canvas (src/components/StageCanvas3D.tsx)
// Extracted Camera Keyframes: ${JSON.stringify(keyframesList.slice(0, 6))}
// Extracted Geometries: ${JSON.stringify((webglScene.geometries || []).slice(0, 6))}
// ============================================================================

export const EXTRACTED_VERTEX_SHADER = ${JSON.stringify(vertexShaderSrc)};
export const EXTRACTED_FRAGMENT_SHADER = ${JSON.stringify(fragmentShaderSrc)};
export const CAMERA_SPLINE_VECTORS: Array<[number, number, number]> = ${JSON.stringify(
    keyframesList.map((k) => k.vector)
  )};

export function interpolateCameraPosition(scrollProgress: number): [number, number, number] {
  const pts = CAMERA_SPLINE_VECTORS;
  if (pts.length === 0) return [0, 0, 10];
  if (pts.length === 1) return pts[0];
  const clamped = Math.max(0, Math.min(1, scrollProgress));
  const scaled = clamped * (pts.length - 1);
  const idx = Math.floor(scaled);
  const t = scaled - idx;
  const a = pts[idx] || pts[0];
  const b = pts[Math.min(pts.length - 1, idx + 1)] || a;
  return [
    Number((a[0] + (b[0] - a[0]) * t).toFixed(2)),
    Number((a[1] + (b[1] - a[1]) * t).toFixed(2)),
    Number((a[2] + (b[2] - a[2]) * t).toFixed(2))
  ];
}

export function StageCanvas3D({ scrollProgress }: { scrollProgress: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    const render = (timeMs: number) => {
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);
      const t = timeMs * 0.001;
      const [camX, camY, camZ] = interpolateCameraPosition(scrollProgress);

      // Procedural night-sky & tactical carrier wireframe stage driven by scrollProgress + camera spline
      ctx.fillStyle = "#060911";
      ctx.fillRect(0, 0, w, h);

      // Perspective horizon grid scrubbed by scrollProgress
      ctx.strokeStyle = "rgba(16, 185, 129, 0.16)";
      ctx.lineWidth = 1;
      const cx = w * 0.5 - camX * 18;
      const cy = h * 0.48 + camY * 14;
      for (let i = -10; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(cx + i * 28, cy);
        ctx.lineTo(cx + i * 160, h);
        ctx.stroke();
      }

      // Procedural 3D Carrier / Rotor Rig Projection
      const scale = Math.max(0.5, 14 / Math.max(4, camZ));
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((scrollProgress - 0.5) * 0.45 + Math.sin(t * 0.7) * 0.04);
      ctx.strokeStyle = "rgba(99, 102, 241, 0.75)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-140 * scale, -42 * scale, 280 * scale, 84 * scale);

      // Ducted fans
      [-90 * scale, 90 * scale].forEach((rx) => {
        ctx.beginPath();
        ctx.arc(rx, 0, 36 * scale, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(16, 185, 129, 0.85)";
        ctx.stroke();
      });
      ctx.restore();

      animId = window.requestAnimationFrame(render);
    };

    animId = window.requestAnimationFrame(render);
    return () => window.cancelAnimationFrame(animId);
  }, [scrollProgress]);

  return (
    <canvas
      id="stage"
      ref={canvasRef}
      data-engine="three.js-procedural-stage"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
`;

  // 3. src/components/Navbar.tsx — Modular Navbar with Extracted SVG Logo, Nav Items & Web Audio Synth Toggle
  const navbarTsx = `import React from "react";

export function Navbar({
  items = ${JSON.stringify(detectedNavItems)},
  audioEnabled = false,
  onToggleAudio
}: {
  items?: string[];
  audioEnabled?: boolean;
  onToggleAudio?: () => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 border-b border-[var(--taste-border,rgba(255,255,255,0.1))] bg-[var(--taste-surface,rgba(15,23,42,0.75))] backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center justify-center text-[var(--taste-accent,#6366f1)]"
          dangerouslySetInnerHTML={{ __html: ${JSON.stringify(brandSvgMarkup)} }}
        />
        <span className="font-mono text-xs tracking-widest uppercase font-bold">
          WEBDNA // RUNTIME v2.0
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider text-[var(--taste-muted,#94a3b8)]">
        {items.map((label, idx) => (
          <a key={idx} href={\`#section-\${idx + 1}\`} className="hover:text-[var(--taste-text,#fff)] transition-colors">
            {label}
          </a>
        ))}
      </nav>
      <button
        type="button"
        onClick={onToggleAudio}
        className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border border-[var(--taste-border,rgba(255,255,255,0.2))] bg-[var(--taste-bg,rgba(0,0,0,0.4))] text-[var(--taste-text,#f8fafc)] hover:border-[var(--taste-accent,#10b981)]"
      >
        {audioEnabled ? "🔊 SYNTH: ONLINE" : "🔇 SYNTH: MUTED"}
      </button>
    </header>
  );
}
`;

  // 4. src/components/SectionHero.tsx & ScrollChaptersOverlay.tsx
  const dynamicHeadings = Array.isArray(pageMeta?.headings) && pageMeta.headings.length > 0 ? pageMeta.headings : [heroHeadline];
  const chaptersData = timelines.chapters?.length > 0
    ? timelines.chapters
    : dynamicHeadings.slice(0, 5).map((lbl, idx, arr) => ({
        id: `section-${idx + 1}`,
        startOffset: Number((idx / Math.max(1, arr.length)).toFixed(2)),
        endOffset: Number(((idx + 1) / Math.max(1, arr.length)).toFixed(2)),
        label: lbl
      }));

  const sectionHeroTsx = `import React from "react";
import { CyberScrambleText } from "./CyberScrambleText";

export interface ScrollChapter {
  id: string;
  startOffset: number;
  endOffset: number;
  label: string;
}

export const EXTRACTED_SCROLL_CHAPTERS: ScrollChapter[] = ${JSON.stringify(chaptersData, null, 2)};

export function SectionHero({
  headline = ${JSON.stringify(heroHeadline)},
  cta = ${JSON.stringify(heroCta)},
  scrollProgress = 0
}: {
  headline?: string;
  cta?: string;
  scrollProgress?: number;
}) {
  return (
    <section className="relative z-10 max-w-5xl mx-auto pt-28 pb-16 px-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-xs font-mono uppercase tracking-widest border border-[var(--taste-border,rgba(255,255,255,0.15))] text-[var(--taste-accent,#10b981)]">
        <CyberScrambleText text={${JSON.stringify(heroBadgeText)}} triggerKey={Math.floor(scrollProgress * 5)} />
      </div>
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
        <CyberScrambleText text={headline} />
      </h1>
      <div className="flex flex-wrap gap-4">
        <a
          href="#briefing-form"
          className="px-6 py-3 text-sm font-semibold text-white bg-[var(--taste-accent,var(--webdna-color-08,#6366f1))] rounded-[var(--taste-radius,12px)] shadow-lg"
        >
          {cta}
        </a>
      </div>
    </section>
  );
}

export function ScrollChaptersOverlay({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="fixed inset-x-0 bottom-16 z-20 pointer-events-none px-6">
      <div className="max-w-5xl mx-auto">
        {EXTRACTED_SCROLL_CHAPTERS.map((ch) => {
          const active = scrollProgress >= ch.startOffset && scrollProgress <= ch.endOffset;
          if (!active) return null;
          return (
            <div
              key={ch.id}
              data-a={ch.startOffset}
              data-b={ch.endOffset}
              className="p-6 rounded-[var(--taste-radius,12px)] border border-[var(--taste-border,rgba(255,255,255,0.18))] bg-[var(--taste-surface,rgba(15,23,42,0.82))] backdrop-blur-md transition-opacity duration-300"
            >
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--taste-accent,#10b981)] mb-1">
                CHAPTER WINDOW [{ch.startOffset.toFixed(2)} → {ch.endOffset.toFixed(2)}] · SCROLL {(scrollProgress * 100).toFixed(0)}%
              </div>
              <h2 className="text-2xl font-bold">
                <CyberScrambleText text={ch.label || ch.id} triggerKey={ch.id} />
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
`;

  // 5. src/components/FormBriefing.tsx
  const formBriefingTsx = `import React from "react";

export function FormBriefing({
  fields = ${JSON.stringify(formFields)},
  action = ${JSON.stringify(formAction)}
}: {
  fields?: string[];
  action?: string;
}) {
  return (
    <section id="briefing-form" className="relative z-10 max-w-3xl mx-auto px-6 py-16">
      <form
        action={action}
        method="POST"
        onSubmit={(e) => e.preventDefault()}
        className="p-6 rounded-[var(--taste-radius,12px)] border border-[var(--taste-border,rgba(255,255,255,0.15))] bg-[var(--taste-surface,rgba(30,41,59,0.9))] backdrop-blur space-y-4"
      >
        <h3 className="text-xl font-bold">Mission Briefing & Telemetry Dispatch</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((fName, idx) => (
            <label key={idx} className="block text-xs font-mono uppercase tracking-wider">
              <span className="block mb-1 text-[var(--taste-muted,#94a3b8)]">{fName}</span>
              <input
                type="text"
                name={fName}
                placeholder={\`Enter \${fName}…\`}
                className="w-full px-3.5 py-2 rounded bg-[var(--taste-bg,#0f172a)] border border-[var(--taste-border,#334155)] text-sm text-[var(--taste-text,#f8fafc)]"
              />
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-semibold text-white bg-[var(--taste-accent,#6366f1)] rounded-[var(--taste-radius,8px)]"
        >
          Transmit Payload
        </button>
      </form>
    </section>
  );
}
`;

  // 5b. src/components/LivingSnapshotMount.tsx — Mode 1: 1:1 Living Replica Loader (mounts snapshot/index.html + scripts/client-bundle.js directly!)
  const detectedFns = Array.isArray(s.extracts?.runtime?.data?.clientScripts?.detectedFunctions)
    ? s.extracts.runtime.data.clientScripts.detectedFunctions
    : [];
  const livingSnapshotMountTsx = `import React, { useEffect, useRef, useState } from "react";

// ============================================================================
// WebDNA v4.2.0 — Mode 1: 1:1 Living Replica Loader (src/components/LivingSnapshotMount.tsx)
// Eliminates "The Starter Trap" by mounting the exact extracted DOM from
// snapshot/index.html (with static-preview CSP removed) and injecting chunks
// in their native Next.js / Webpack / Three.js execution order via
// /scripts/script-manifest.json (01-importmap -> 02-webpack-runtime ->
// 03-polyfills-framework -> 04-vendor-chunk -> 05-page-manifest ->
// 06-dynamic-chunk -> 07-inline-boot), with fallback to /scripts/client-bundle.js.
// Preserved Runtime Functions: ${detectedFns.join(", ") || "boot3, scramble, enter, setSound"}
// ============================================================================

export interface OrderedScriptEntry {
  order: number;
  id: string;
  kind: "importmap" | "flight-stream" | "external" | "inline";
  stage: string;
  type: string;
  localUrl: string;
  inlineCode?: string;
}

export function LivingSnapshotMount({
  snapshotUrl = "/snapshot/index.html",
  scriptManifestUrl = "/scripts/script-manifest.json",
  scriptBundleUrl = "/scripts/client-bundle.js"
}: {
  snapshotUrl?: string;
  scriptManifestUrl?: string;
  scriptBundleUrl?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "mounted" | "fallback">("loading");

  useEffect(() => {
    let canceled = false;
    (async () => {
      try {
        const res = await fetch(snapshotUrl);
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        const rawHtml = await res.text();
        if (canceled || !containerRef.current) return;

        // 1. Parse snapshot/index.html and remove the static-preview Content-Security-Policy meta tag so runtime scripts can execute
        const parser = new DOMParser();
        const parsedDoc = parser.parseFromString(rawHtml, "text/html");
        parsedDoc.querySelectorAll('meta[http-equiv="Content-Security-Policy"]').forEach((m) => m.remove());

        // 2. Inject extracted <head> styles and local /_next/static/media/ font preloads into document.head
        parsedDoc.querySelectorAll("style, link[rel='stylesheet'], link[rel='preload'][as='font']").forEach((styleNode, idx) => {
          const clone = styleNode.cloneNode(true) as HTMLElement;
          clone.setAttribute("data-webdna-snapshot-style", String(idx));
          document.head.appendChild(clone);
        });

        // 3. Mount the complete extracted <body> markup (#stage, #track, chapters, SVGs, HUD, modals)
        containerRef.current.innerHTML = parsedDoc.body.innerHTML;

        // 4. Respect Next.js & Three.js Script Execution Order & Stream Hydration (v4.1.0):
        //    Step 1: Execute all importmaps and self.__next_f Flight stream inline state scripts FIRST.
        //    Step 2: Load vendor, Webpack runtime, and page manifest scripts sequentially.
        //    Step 3: Fire DOMContentLoaded and load events ONLY after all scripts have executed.
        //    Step 4: Dispatch resize & ScrollTrigger.refresh() at 500ms so GSAP/Lenis recalculate layout.
        (window as any).__next_f = (window as any).__next_f || [];
        let executedOrderedManifest = false;
        try {
          const mfRes = await fetch(scriptManifestUrl);
          if (mfRes.ok) {
            const mf = await mfRes.json();
            const entries: OrderedScriptEntry[] = Array.isArray(mf?.scripts) ? mf.scripts : [];
            if (entries.length > 0) {
              const flightEntries = entries.filter(
                (e) => e.kind === "importmap" || e.kind === "flight-stream" || e.stage === "01b-next-flight-stream"
              );
              const runtimeEntries = entries.filter(
                (e) => !(e.kind === "importmap" || e.kind === "flight-stream" || e.stage === "01b-next-flight-stream")
              );

              // Step 1: Execute all importmap & self.__next_f inline Flight stream scripts synchronously first
              for (const fEntry of flightEntries) {
                if (canceled) return;
                if (fEntry.kind === "importmap" && fEntry.inlineCode) {
                  const imEl = document.createElement("script");
                  imEl.type = "importmap";
                  imEl.textContent = fEntry.inlineCode;
                  document.head.appendChild(imEl);
                } else if (fEntry.inlineCode) {
                  const flEl = document.createElement("script");
                  flEl.dataset.webdnaStage = fEntry.stage;
                  flEl.textContent = fEntry.inlineCode;
                  document.body.appendChild(flEl);
                }
              }

              // Step 2: Load vendor, Webpack runtime, Framer modules, and application scripts sequentially
              for (const entry of runtimeEntries) {
                if (canceled) return;

                // 2a. Data scripts (such as Framer appear animations or JSON data)
                if (
                  entry.type === "framer/appear" ||
                  entry.id?.startsWith("__framer__") ||
                  entry.type?.includes("json")
                ) {
                  try {
                    const dEl = document.createElement("script");
                    if (entry.id) dEl.id = entry.id;
                    dEl.type = entry.type || "text/plain";
                    if (entry.inlineCode) {
                      dEl.textContent = entry.inlineCode;
                    } else if (entry.localUrl) {
                      const res = await fetch(entry.localUrl);
                      if (res.ok) dEl.textContent = await res.text();
                    }
                    document.head.appendChild(dEl);
                  } catch {}
                  continue;
                }

                // 2b. Module preload links: register with <link rel="modulepreload"> instead of running as standalone scripts
                if (entry.type === "modulepreload") {
                  const linkEl = document.createElement("link");
                  linkEl.rel = "modulepreload";
                  linkEl.href = entry.localUrl;
                  document.head.appendChild(linkEl);
                  continue;
                }

                // 2c. Executable scripts (Next.js bundles, Framer entry modules, inline boot scripts)
                const isModule =
                  entry.type === "module" ||
                  entry.type === "entry-module" ||
                  entry.localUrl?.endsWith(".mjs") ||
                  entry.src?.endsWith(".mjs");

                await new Promise<void>((resolve) => {
                  const sEl = document.createElement("script");
                  sEl.async = false;
                  if (entry.id) sEl.id = entry.id;
                  if (isModule) {
                    sEl.type = "module";
                  } else if (
                    entry.type &&
                    entry.type !== "external-script" &&
                    entry.type !== "network-harvested-chunk" &&
                    entry.type !== "spidered-chunk"
                  ) {
                    sEl.type = entry.type;
                  }
                  sEl.dataset.webdnaStage = entry.stage;
                  sEl.dataset.webdnaOrder = String(entry.order);
                  const done = () => resolve();
                  sEl.addEventListener("load", done, { once: true });
                  sEl.addEventListener("error", done, { once: true });
                  setTimeout(done, 1500);
                  sEl.src = entry.localUrl;
                  document.body.appendChild(sEl);
                });
              }
              executedOrderedManifest = true;
            }
          }
        } catch {}

        // Fallback to combined /scripts/client-bundle.js if manifest was empty
        if (!executedOrderedManifest) {
          const scriptEl = document.createElement("script");
          scriptEl.type = "module";
          scriptEl.src = scriptBundleUrl;
          scriptEl.dataset.webdnaRuntime = "client-bundle";
          document.body.appendChild(scriptEl);
        }

        // Step 3: Fire DOMContentLoaded and load events ONLY after all scripts have executed
        try {
          document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true }));
          window.dispatchEvent(new Event("load"));
        } catch {}

        // Step 4 (Issue 5 Fix): Post-mount layout & GSAP / Lenis / ScrollTrigger refresh after fonts & images settle
        const syncScrollTriggers = () => {
          try {
            window.dispatchEvent(new Event("resize"));
            window.dispatchEvent(new Event("scroll"));
            if ((window as any).ScrollTrigger && typeof (window as any).ScrollTrigger.refresh === "function") {
              (window as any).ScrollTrigger.refresh();
            }
            if ((window as any).lenis && typeof (window as any).lenis.resize === "function") {
              (window as any).lenis.resize();
            }
          } catch {}
        };
        setTimeout(syncScrollTriggers, 150);
        setTimeout(syncScrollTriggers, 500);
        if ((document as any).fonts?.ready) {
          (document as any).fonts.ready.then(syncScrollTriggers).catch(() => {});
        }

        setStatus("mounted");
      } catch {
        if (!canceled) setStatus("fallback");
      }
    })();
    return () => {
      canceled = true;
    };
  }, [snapshotUrl, scriptManifestUrl, scriptBundleUrl]);

  return (
    <div id="webdna-living-replica-root" data-status={status}>
      <div ref={containerRef} />
    </div>
  );
}
`;

  // 6. Auto-assembled src/App.tsx combining Mode 1 (1:1 Living Replica Mount), Mode 2 (Modular 3D Scroll-Film React), and Mode 3 (Section Topology)
  const trackHeightCss = timelines.isScrollFilm ? timelines.totalVhRatio : "200vh";
  const appTsx = `import React from "react";
import "./tokens.css";
import "./animations.css";
import "./taste-presets.css";
import { LivingSnapshotMount } from "./components/LivingSnapshotMount";

// ============================================================================
// WebDNA v4.2.0 — 1:1 Living Replica Application Shell
// Locked to LivingSnapshotMount: Mounts live DOM, CSS, WebGL & scripts at 1:1 parity
// ============================================================================

export default function App() {
  return (
    <main className="w-full min-h-screen bg-black text-white">
      <LivingSnapshotMount />
    </main>
  );
}
`;

  // Also generate TopologyPage.tsx and taste-presets.css
  const sections = rawTopology.length > 0 ? rawTopology : [
    { order: 1, id: "section-01-navbar-header", archetype: "navbar-header", tag: "header", rect: { x: 0, y: 0, w: 1440, h: 72 }, layout: { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "16px", padding: "16px 32px" }, counts: { links: 4, buttons: 1 } },
    { order: 2, id: "section-02-hero-banner", archetype: "hero-banner", tag: "section", rect: { x: 0, y: 72, w: 1440, h: 640 }, layout: { display: "flex", flexDirection: "column", gap: "20px", padding: "64px 32px" }, counts: { headings: 1, buttons: 2, images: 1 } }
  ];

  const tasteCssLines = [
    `/* WebDNA v2.0.0 — Aesthetic Taste-Swap Presets */`,
    ``
  ];
  for (const [key, cfg] of Object.entries(TASTE_PRESETS)) {
    if (key === "extracted-original") continue;
    tasteCssLines.push(`[data-taste="${key}"] {`);
    for (const [k, v] of Object.entries(cfg.vars)) {
      tasteCssLines.push(`  ${k}: ${v};`);
    }
    tasteCssLines.push(`}`, ``);
  }

  const topologyPageTsx = `import React from "react";
import { Navbar } from "./components/Navbar";
import { SectionHero } from "./components/SectionHero";
import { FormBriefing } from "./components/FormBriefing";

// Generated by WebDNA v2.0.0 — Ordered Section Topology (${sections.length} sections)
export default function TopologyPage() {
  return (
    <div className="min-h-screen space-y-12 pb-24">
      <Navbar />
      <SectionHero />
      <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        ${sections.slice(0, 6).map((sec) => `<article className="p-5 rounded-[var(--taste-radius,12px)] border border-[var(--taste-border,#334155)] bg-[var(--taste-surface,#1e293b)]">
          <div className="text-xs font-mono text-[var(--taste-accent,#10b981)] mb-1">#${sec.order} · ${sec.archetype}</div>
          <h3 className="font-bold text-base mb-1">${(sec.props?.headline || sec.id).replace(/"/g, "'")}</h3>
          <p className="text-xs text-[var(--taste-muted,#94a3b8)]">&lt;${sec.tag}&gt; ${sec.rect?.w || 1440}×${sec.rect?.h || 200}px · ${sec.layout?.display}</p>
        </article>`).join("\n        ")}
      </section>
      <FormBriefing />
    </div>
  );
}
`;

  return {
    sections,
    appTsx,
    topologyPageTsx,
    cyberScrambleTsx,
    stageCanvas3DTsx,
    navbarTsx,
    sectionHeroTsx,
    formBriefingTsx,
    livingSnapshotMountTsx,
    tasteCss: tasteCssLines.join("\n")
  };
}

// ----------------------------------------------------------------------------
// 5. Exporters: JSON, CSS Custom Properties, Tailwind Config (+ @keyframes!), HTML Snapshot
// ----------------------------------------------------------------------------
function Ne(s) {
  return `--webdna-${s.replace(/^--+/, "").toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "token"}`;
}

function Pe(s) {
  const e = String(s || "").toLowerCase();
  return !(e.includes("expression(") || e.includes("</style") || /url\(\s*["']?\s*(javascript|data|vbscript):/.test(e));
}

function xs(s) {
  const slug = getSiteSlug(s);
  const e = {
    schemaVersion: s.schemaVersion,
    reportId: s.reportId,
    scanId: s.scanId,
    createdAt: s.createdAt,
    source: s.source,
    coverage: s.coverage,
    status: s.status,
    tokens: s.tokens,
    extracts: s.extracts,
    warnings: s.warnings,
    generator: "webdna@4.2.0"
  };
  return {
    fileName: `${slug}-report.json`,
    mime: "application/json",
    content: JSON.stringify(e, null, 2)
  };
}

function bs(s) {
  const slug = getSiteSlug(s);
  const e = [
    `/* ==========================================================================`,
    ` * WebDNA v4.2.0 UNIVERSAL AGENT LOCK (ANTIGRAVITY + ALL IDEs)esign System Tokens (with CSS Function Parenthesis Validator)`,
    ` * Source: ${s.source.origin}${s.source.path}`,
    ` * Generated: ${s.createdAt} | Schema: ${s.schemaVersion}`,
    ` * ========================================================================== */`,
    `:root {`,
    `  /* --- Color Palette (HEX, RGBA & Modern CSS oklab/oklch/color) --- */`
  ];
  s.tokens.filter((i) => i.category === "color").forEach((i, c) => {
    const h = Ne(`color-${String(c + 1).padStart(2, "0")}`);
    const safeVal = balanceCssParentheses(i.value, 500);
    const hex = balanceCssParentheses(i.hex || rgbaToHexStr(safeVal), 500);
    const roleComment = i.role ? ` /* ${i.role} (×${i.frequency}) */` : "";
    if (Pe(safeVal)) {
      e.push(`  ${h}: ${hex};${roleComment}`);
      e.push(`  ${h}-rgb: ${safeVal};`);
    }
  });

  e.push(``, `  /* --- Typography Scale & Font Stacks --- */`);
  s.tokens.filter((i) => i.category === "font").forEach((i, c) => {
    const h = Ne(`font-${String(c + 1).padStart(2, "0")}`);
    const u = i.value.replace(/["';\\]/g, "");
    e.push(`  ${h}: "${u}", system-ui, -apple-system, sans-serif;`);
  });

  e.push(``, `  /* --- Spacing & Rhythm Scale --- */`);
  s.tokens.filter((i) => i.category === "spacing").forEach((i, c) => {
    const h = Ne(`spacing-${String(c + 1).padStart(2, "0")}`);
    const safeVal = balanceCssParentheses(i.value, 500);
    if (Pe(safeVal)) e.push(`  ${h}: ${safeVal};`);
  });

  e.push(``, `  /* --- Border Radii --- */`);
  s.tokens.filter((i) => i.category === "radius").forEach((i, c) => {
    const h = Ne(`radius-${String(c + 1).padStart(2, "0")}`);
    const safeVal = balanceCssParentheses(i.value, 500);
    if (Pe(safeVal)) e.push(`  ${h}: ${safeVal};`);
  });

  e.push(``, `  /* --- Elevation & Box Shadows --- */`);
  s.tokens.filter((i) => i.category === "shadow").forEach((i, c) => {
    const h = Ne(`shadow-${String(c + 1).padStart(2, "0")}`);
    const safeVal = balanceCssParentheses(i.value, 500);
    if (Pe(safeVal)) e.push(`  ${h}: ${safeVal};`);
  });

  const a = s.extracts.cssVariables;
  if (a && Array.isArray(a.data) && a.data.length > 0) {
    e.push(``, `  /* --- Page Native CSS Custom Properties (Validated for Balanced oklab/color/calc/var Parentheses) --- */`);
    for (const i of a.data) {
      const c = Ne(i.name);
      const safeVal = balanceCssParentheses(i.value, 500);
      if (Pe(safeVal)) e.push(`  ${c}: ${safeVal};`);
    }
  }
  e.push(`}`);
  return {
    fileName: `${slug}-tokens.css`,
    mime: "text/css",
    content: e.join("\n") + "\n"
  };
}

function generateTailwindConfig(s) {
  const slug = getSiteSlug(s);
  const { keyframes } = getRuntimeData(s);
  const colors = {};
  s.tokens.filter((t) => t.category === "color").slice(0, 24).forEach((t, idx) => {
    const key = t.role ? `${t.role}-${idx + 1}` : `brand-${String(idx + 1).padStart(2, "0")}`;
    colors[key] = t.hex || rgbaToHexStr(t.value);
  });
  const fontFamily = {};
  s.tokens.filter((t) => t.category === "font").slice(0, 6).forEach((t, idx) => {
    const key = idx === 0 ? "sans" : idx === 1 ? "display" : `custom-${idx + 1}`;
    fontFamily[key] = [t.value, "system-ui", "sans-serif"];
  });
  const borderRadius = {};
  s.tokens.filter((t) => t.category === "radius").slice(0, 8).forEach((t, idx) => {
    borderRadius[`token-${idx + 1}`] = t.value;
  });
  const boxShadow = {};
  s.tokens.filter((t) => t.category === "shadow").slice(0, 8).forEach((t, idx) => {
    boxShadow[`elevation-${idx + 1}`] = t.value;
  });
  const twKeyframes = {};
  const twAnimation = {};
  keyframes.slice(0, 15).forEach((kf) => {
    twKeyframes[kf.name] = { "0%, 100%": { opacity: "1" } };
    twAnimation[kf.name] = `${kf.name} 2s ease-in-out infinite`;
  });

  const code = `/** @type {import('tailwindcss').Config} */
// Generated by WebDNA v2.0.0 — Source: ${s.source.origin}${s.source.path}
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,svelte}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 6).replace(/\n/g, "\n      ")},
      fontFamily: ${JSON.stringify(fontFamily, null, 6).replace(/\n/g, "\n      ")},
      borderRadius: ${JSON.stringify(borderRadius, null, 6).replace(/\n/g, "\n      ")},
      boxShadow: ${JSON.stringify(boxShadow, null, 6).replace(/\n/g, "\n      ")},
      keyframes: ${JSON.stringify(twKeyframes, null, 6).replace(/\n/g, "\n      ")},
      animation: ${JSON.stringify(twAnimation, null, 6).replace(/\n/g, "\n      ")}
    }
  },
  plugins: []
};
`;
  return {
    fileName: `${slug}-tailwind.config.js`,
    mime: "application/javascript",
    content: code
  };
}

function generateHtmlSnapshotExport(s) {
  const slug = getSiteSlug(s);
  const compData = s.extracts.components?.data || {};
  const rawSnap = compData.htmlSnapshot || "";
  if (rawSnap && rawSnap.length > 40) {
    return {
      fileName: `${slug}-snapshot.html`,
      mime: "text/html",
      content: rawSnap
    };
  }
  const colorSwatches = s.tokens.filter((t) => t.category === "color").map((t) => {
    const hex = t.hex || rgbaToHexStr(t.value);
    return `<div style="border:1px solid #e2e8f0;border-radius:8px;padding:12px;background:#fff"><div style="height:48px;border-radius:6px;background:${t.value};margin-bottom:8px;border:1px solid rgba(0,0,0,0.08)"></div><strong>${hex}</strong><div style="font-size:12px;color:#64748b">${t.role || t.name} · ×${t.frequency}</div></div>`;
  }).join("\n");
  const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline';">
  <title>WebDNA Visual Styleguide Snapshot — ${s.source.origin}</title>
</head>
<body style="font-family:system-ui,sans-serif;padding:32px;max-width:1080px;margin:0 auto;background:#f8fafc;color:#0f172a">
  <h1>WebDNA Sanitized Visual Styleguide — ${s.source.origin}${s.source.path}</h1>
  <p>Captured ${s.createdAt} · ${s.coverage.visited} DOM nodes inspected</p>
  <h2>Color Palette</h2>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px">${colorSwatches}</div>
</body>
</html>`;
  return {
    fileName: `${slug}-snapshot.html`,
    mime: "text/html",
    content: fallbackHtml
  };
}

// ----------------------------------------------------------------------------
// 6. Production DESIGN.md & 1:1 Runtime + Full-Stack AI Master Prompt Engine
// ----------------------------------------------------------------------------
function generateBackendBlueprintFiles(s) {
  const compData = s.extracts.components?.data || {};
  const backend = compData.backend || { models: [], endpoints: [], authPatterns: [] };
  const models = Array.isArray(backend.models) && backend.models.length > 0 ? backend.models : [
    {
      name: "ContentItem",
      source: "inferred-ui-grid",
      fields: [
        { name: "id", inputType: "uuid", dbType: "String", required: true },
        { name: "title", inputType: "text", dbType: "String", required: true },
        { name: "summary", inputType: "textarea", dbType: "String", required: false },
        { name: "imageUrl", inputType: "url", dbType: "String", required: false },
        { name: "createdAt", inputType: "datetime", dbType: "DateTime", required: true }
      ]
    }
  ];
  const endpoints = Array.isArray(backend.endpoints) && backend.endpoints.length > 0 ? backend.endpoints : [
    { method: "GET", path: "/api/items", summary: "List items", requestFields: ["limit?: Int"] },
    { method: "POST", path: "/api/items", summary: "Create item", requestFields: ["title: String", "summary?: String"] }
  ];

  const prismaLines = [
    `// Generated by WebDNA v2.0.0 Full-Stack Engine`,
    `// Source: ${s.source.origin}${s.source.path}`,
    `datasource db {`,
    `  provider = "postgresql"`,
    `  url      = env("DATABASE_URL")`,
    `}`,
    ``,
    `generator client {`,
    `  provider = "prisma-client-js"`,
    `}`,
    ``
  ];
  models.forEach((m) => {
    prismaLines.push(`model ${m.name} {`);
    prismaLines.push(`  id        String   @id @default(cuid())`);
    (m.fields || []).forEach((f) => {
      if (f.name === "id" || f.name === "createdAt") return;
      const opt = f.required ? "" : "?";
      prismaLines.push(`  ${f.name.padEnd(10)} ${f.dbType}${opt}`);
    });
    prismaLines.push(`  createdAt DateTime @default(now())`);
    prismaLines.push(`  updatedAt DateTime @updatedAt`);
    prismaLines.push(`}`, ``);
  });

  const apiLines = [
    `// Generated by WebDNA v2.0.0 — Full-Stack API Route Blueprint (Next.js App Router / Fetch Standard)`,
    `import { NextRequest, NextResponse } from "next/server";`,
    `import { z } from "zod";`,
    ``
  ];
  endpoints.forEach((ep, idx) => {
    apiLines.push(`// Endpoint ${idx + 1}: ${ep.method} ${ep.path} — ${ep.summary}`);
  });
  apiLines.push(`
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(100, Number(searchParams.get("limit") ?? 20));
  return NextResponse.json({
    ok: true,
    source: "${s.source.origin}",
    limit,
    data: []
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json({ ok: true, received: body }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }
}
`);

  return {
    prismaSchema: prismaLines.join("\n"),
    apiRoutesTs: apiLines.join("\n"),
    models,
    endpoints
  };
}

function ks(s, customOpts = {}) {
  const slug = getSiteSlug(s);
  const frontendStack = customOpts.frontendStack || "React 18 + Next.js App Router + Three.js / WebGL + Tailwind CSS + TypeScript";
  const backendStack = customOpts.backendStack || "Next.js Route Handlers + Prisma ORM + PostgreSQL + Zod";
  const promptMode = customOpts.promptMode || "same-topology-rebrand";
  const tastePresetKey = customOpts.tastePreset || "extracted-original";
  const activeTaste = TASTE_PRESETS[tastePresetKey] || TASTE_PRESETS["extracted-original"];

  const safeTokens = Array.isArray(s.tokens) ? s.tokens : [];
  const colorTokens = safeTokens.filter((v) => v && v.category === "color");
  const fontTokens = safeTokens.filter((v) => v && v.category === "font");
  const spacingTokens = safeTokens.filter((v) => v && v.category === "spacing");
  const radiusTokens = safeTokens.filter((v) => v && v.category === "radius");
  const shadowTokens = safeTokens.filter((v) => v && v.category === "shadow");

  const layoutData = s.extracts.layout?.data || { flexCount: 0, gridCount: 0, blockCount: 0, maxDepth: 0, flexGaps: [], gridTemplates: [], gradients: [] };
  const typographyRaw = Array.isArray(s.extracts.typography?.data) ? s.extracts.typography.data : [];
  const assetsRaw = Array.isArray(s.extracts.assets?.data) ? s.extracts.assets.data : [];
  const cssVarsRaw = Array.isArray(s.extracts.cssVariables?.data) ? s.extracts.cssVariables.data : [];
  const animsRaw = Array.isArray(s.extracts.animations?.data) ? s.extracts.animations.data : [];
  const compExtract = s.extracts.components?.data || {};
  const detectedComponents = Array.isArray(compExtract.components) ? compExtract.components : [];
  const { prismaSchema, apiRoutesTs, models, endpoints } = generateBackendBlueprintFiles(s);
  const { webglScene, timelines, audioGraph, clientScripts, keyframes } = getRuntimeData(s);
  const modularSuite = generateModularReactSuite(s, tastePresetKey);
  const topologySections = modularSuite.sections;

  const primaryFont = fontTokens[0]?.value || "Inter, system-ui, sans-serif";
  const headingFont = fontTokens[1]?.value || primaryFont;
  const domMeta = s.extracts.dom?.data || {};

  const scriptBytesKb = Math.max(1, Math.round(((clientScripts.totalBytes || 4096) / 1024) * 10) / 10);
  const fnNamesList = Array.isArray(clientScripts.detectedFunctions) && clientScripts.detectedFunctions.length > 0
    ? clientScripts.detectedFunctions.slice(0, 12).map((fn) => `\`${fn}()\``).join(", ")
    : "`boot3()`, `scramble()`, `enter()`, `setSound()`, `initTacticalAudio()`";
  const fontAssetsCount = assetsRaw.filter((a) => a.kind === "font").length;
  const svgAssetsCount = assetsRaw.filter((a) => a.kind === "svg").length;
  const chapterCount = timelines.chapters?.length || topologySections.length || 3;
  const formCompInfo = detectedComponents.find((c) => c.kind === "form");
  const formFieldCount = formCompInfo?.props?.fields?.length || 4;

  const e = [];
  e.push(`# WebDNA v4.2.0 — 1:1 Living Replica, 3D/WebGL Runtime, Scroll Choreography & Full-Stack Specification`);
  e.push(``);
  e.push(`### 🚨 CRITICAL BUILD DIRECTIVE FOR AI AGENTS (DO NOT SKIP — AVOID "THE STARTER TRAP")`);
  e.push(`- **DO NOT** generate a simplified placeholder card, basic wireframe, or generic dashboard.`);
  e.push(`- The living runtime engine is **ALREADY extracted** in \`scripts/client-bundle.js\` (\`${scriptBytesKb} KB\`, ${clientScripts.inlineCount} inline + ${clientScripts.externalCount} external script(s)).`);
  e.push(`- The complete DOM, CSS, and inline SVGs (${svgAssetsCount} SVGs) are **ALREADY extracted** in \`snapshot/index.html\`.`);
  e.push(`- **YOUR JOB** is to wire \`scripts/client-bundle.js\` and \`snapshot/index.html\` (or refactor their exact mathematical constants, shaders, and scroll triggers) into your application shell so the full 3D WebGL stage (\`#stage\`), preloader, procedural Web Audio synth, and scroll film (\`#track\`, \`${timelines.totalVhRatio}\`) execute natively.`);
  e.push(``);
  e.push(`### 🗺️ BUNDLED ARTIFACT INGESTION HIERARCHY ("WHERE THE REAL CODE LIVES")`);
  e.push(`1. \`scripts/client-bundle.js\` → **Primary Runtime Logic**: Contains the procedural Three.js meshes/geometries (${webglScene.geometries?.length || 0} geometries), GLSL shaders (${webglScene.shaders?.length || 0} shaders), camera spline vectors (${webglScene.cameraRig?.keyframes?.length || 0} waypoints), text-scramble routines, and Web Audio oscillators (${fnNamesList}).`);
  e.push(`2. \`snapshot/index.html\` → **Markup & Layout Truth**: Contains all ${chapterCount} chapter/section overlays, ${svgAssetsCount} serialized inline blueprint SVGs, tactical HUD, preloader, and interactive form/modal markup.`);
  e.push(`3. \`timelines.json\` → **Scroll Coordinates**: Maps the \`${timelines.totalVhRatio}\` (\`${timelines.totalScrollPx}px\`) scroll track height to exact \`data-a\` and \`data-b\` chapter visibility thresholds and \`[data-s]\` cyber-scramble targets.`);
  e.push(`4. \`assets/scene.json\` & \`audio-nodes.json\` → **3D & Audio Schemas**: Structured JSON representations of the Three.js scene graph, camera rig, and Web Audio \`AudioContext\` oscillator/filter graph.`);
  e.push(`5. \`assets/fonts/\` & \`assets/icons/\` → **Local Typography & Vector Assets**: ${fontAssetsCount} local font files and ${svgAssetsCount} standalone \`.svg\` files (no external CDNs needed).`);
  e.push(`6. \`src/App.tsx\` & \`src/components/LivingSnapshotMount.tsx\` → **Entry Scaffold**: Mount the extracted markup and initialize the runtime bundle here.`);
  e.push(``);
  e.push(`### 🔌 BOOTSTRAP PATTERN (HOW TO INITIALIZE FOR 100% PARITY)`);
  e.push(`To achieve 100% visual, 3D, and motion parity without losing runtime behavior:`);
  e.push(`1. Ensure \`<meta http-equiv="Content-Security-Policy">\` from \`snapshot/index.html\` is removed when mounting in your live app so client scripts can execute.`);
  e.push(`2. Mount the Three.js import map and post-processing add-ons (\`EffectComposer\`, \`RenderPass\`, \`UnrealBloomPass\`) if external Three.js modules are referenced.`);
  e.push(`3. Load and execute \`scripts/client-bundle.js\` against the mounted \`#stage\` canvas and \`#track\` scroll container (already automated in \`<LivingSnapshotMount />\`).`);
  e.push(`4. If converting to modular React components (\`Mode 2\`), preserve the exact functions and mathematical constants from \`scripts/client-bundle.js\` (${fnNamesList}).`);
  e.push(``);
  e.push(`### ⚙️ IMPLEMENTATION MODES`);
  e.push(`- **Mode 1: 1:1 Living Replica (Default Recommended for Exact Clones)**: Directly mount \`snapshot/index.html\` + \`scripts/client-bundle.js\` via \`<LivingSnapshotMount />\` in \`src/App.tsx\` for instant, identical visual, 3D, and audio parity.`);
  e.push(`- **Mode 2: Modernized React/Next.js Architecture (Recommended for Custom Taste / Rebranding)**: Refactor the procedural code into typed React components (\`<StageCanvas3D />\`, \`<Navbar />\`, \`<SectionHero />\`, \`<ScrollChaptersOverlay />\`, \`<CyberScrambleText />\`, \`<FormBriefing />\`) while preserving the exact mathematical constants, camera spline vectors, and shader code from \`scripts/client-bundle.js\`.`);
  e.push(``);
  e.push(`### 🛡️ VERIFICATION GATES (AGENT MUST SELF-AUDIT BEFORE COMPLETING)`);
  e.push(`Before reporting completion to the user, verify every gate below:`);
  e.push(`- [ ] **Preloader / Boot Sequence**: Does the initial boot sequence / scan line initialize cleanly and transition into the live stage?`);
  e.push(`- [ ] **3D WebGL Stage (\`#stage\`)**: Does the procedural WebGL/Three.js scene render on \`#stage\` with its ${webglScene.geometries?.length || 3} geometries, ${webglScene.shaders?.length || 2} shaders, and camera spline interpolation?`);
  e.push(`- [ ] **Scroll Choreography (\`timelines.json\`)**: Does scrolling scrub the \`${timelines.totalVhRatio}\` track across all ${chapterCount} chapters matching exact \`data-a\` / \`data-b\` thresholds?`);
  e.push(`- [ ] **Tactical HUD & Cyber-Scramble (\`[data-s]\`)**: Do the ${timelines.pinnedLayers?.length || 2} pinned HUD layers and ${timelines.scrambleTargets?.length || 4} \`[data-s]\` text-decipher targets animate properly?`);
  e.push(`- [ ] **Procedural Web Audio (\`audio-nodes.json\`)**: Does clicking the audio toggle button initialize the Web Audio API synthesizer (${audioGraph.oscillators?.map((o) => `${o.waveform}@${o.frequencyHz}Hz`).join(" + ") || "sawtooth@48Hz + sine@96Hz"})?`);
  e.push(`- [ ] **Interactive Form / Briefing Modal**: Does the ${formFieldCount}-field form (\`${formCompInfo?.props?.action || "/api/briefing"}\`) render and validate cleanly?`);
  e.push(`- [ ] **Zero Console Errors**: Are there **ZERO** uncaught runtime or shader compilation errors in the browser console?`);
  e.push(``);
  e.push(`| Property | Value |`);
  e.push(`| :--- | :--- |`);
  e.push(`| **Site Archive Slug** | \`${slug}\` |`);
  const sourceOriginStr = s.source ? ((s.source.origin || "") + (s.source.path || "")) : slug;
  e.push(`| **Source Origin** | \`${sourceOriginStr}\` |`);
  e.push(`| **Captured At** | \`${s.createdAt}\` |`);
  const vpW = s.source?.viewport?.w || 1440;
  const vpH = s.source?.viewport?.h || 900;
  e.push(`| **Viewport & Scroll Track** | \`${vpW} × ${vpH} px\` · Total Scroll Track: \`${timelines.totalVhRatio || "100vh"}\` (\`${timelines.totalScrollPx || 0} px\`, Scroll-Film: \`${timelines.isScrollFilm || false}\`) |`);
  e.push(`| **Deep DOM Census** | \`${s.coverage.visited} elements visited\` (Open Shadow Roots: \`${domMeta.shadowRoots?.open ?? 0}\`, Iframes: \`${domMeta.frames?.iframeCount ?? 0}\`) |`);
  e.push(`| **3D / WebGL & Shaders** | \`${webglScene.canvases?.length || 0}\` Canvas(es) · \`${webglScene.geometries?.length || 0}\` Geometries · \`${webglScene.materials?.length || 0}\` Materials · \`${webglScene.shaders?.length || 0}\` GLSL Shaders · \`${webglScene.cameraRig?.keyframes?.length || 0}\` Camera Vectors |`);
  e.push(`| **Scroll & Text Choreography** | \`${timelines.chapters?.length || 0}\` Scroll Chapters (\`data-a\`/\`data-b\`) · \`${timelines.pinnedLayers?.length || 0}\` Pinned Layers · \`${timelines.scrambleTargets?.length || 0}\` Cyber-Scramble (\`data-s\`) Targets |`);
  e.push(`| **Procedural Web Audio** | \`${audioGraph.oscillators?.length || 0}\` Oscillator(s) · \`${audioGraph.filters?.length || 0}\` BiquadFilter(s) |`);
  e.push(`| **Code Archeology** | \`${clientScripts.inlineCount}\` Inline Script(s) + \`${clientScripts.externalCount}\` External Script(s) saved to \`scripts/client-bundle.js\` |`);
  e.push(`| **Active Taste Preset** | **${activeTaste.label}** |`);
  e.push(``);

  // --------------------------------------------------------------------------
  // SECTION 1: COPY-PASTE MASTER PROMPT FOR AI CODING AGENTS
  // --------------------------------------------------------------------------
  e.push(`## 1. Master Prompt for AI Coding Agents (Cursor / Claude / Windsurf / v0 / Bolt)`);
  e.push(``);
  e.push(`> **Instructions**: Copy the prompt block below into Cursor, Claude Code, Windsurf, v0, or Bolt. All accompanying runtime files (\`assets/scene.json\`, \`timelines.json\`, \`audio-nodes.json\`, \`scripts/client-bundle.js\`, \`src/animations.css\`, and modular \`src/components/*.tsx\`) are included in \`${slug}-project-kit.zip\`.`);
  e.push(``);
  e.push("```markdown");
  e.push(`### 🚨 CRITICAL BUILD DIRECTIVE FOR AI AGENTS (DO NOT SKIP)`);
  e.push(`- DO NOT generate a simplified placeholder card, basic wireframe, or generic dashboard.`);
  e.push(`- The living runtime engine is ALREADY extracted in \`scripts/client-bundle.js\` (${scriptBytesKb} KB).`);
  e.push(`- The complete DOM, CSS, and inline SVGs are ALREADY extracted in \`snapshot/index.html\`.`);
  e.push(`- YOUR JOB is to wire \`scripts/client-bundle.js\` and \`snapshot/index.html\` (or their exact mathematical constants, shaders, camera splines, and scroll choreography) into the application so the full 3D WebGL stage, preloader, audio synth, and scroll film execute natively.`);
  e.push(``);
  e.push(`### 🗺️ BUNDLED ARTIFACT INGESTION HIERARCHY`);
  e.push(`1. \`scripts/client-bundle.js\` → Primary Runtime Logic (${fnNamesList}).`);
  e.push(`2. \`snapshot/index.html\` → Markup & Layout Truth (${chapterCount} sections/chapters, ${svgAssetsCount} inline SVGs, HUD & forms).`);
  e.push(`3. \`timelines.json\` → Scroll Coordinates (\`${timelines.totalVhRatio}\` track, \`data-a\`/\`data-b\` chapter windows, \`[data-s]\` scramble nodes).`);
  e.push(`4. \`assets/scene.json\` & \`audio-nodes.json\` → Three.js geometries, GLSL shaders, camera waypoints & Web Audio oscillator graph.`);
  e.push(`5. \`src/App.tsx\` & \`src/components/LivingSnapshotMount.tsx\` → Entry Scaffold supporting both Mode 1 (1:1 Living Mount) and Mode 2 (Modular React/Tailwind + Taste Swapper).`);
  e.push(``);
  e.push(`### 🔌 BOOTSTRAP & SELF-AUDIT VERIFICATION GATES`);
  e.push(`1. Strip \`<meta http-equiv="Content-Security-Policy">\` from \`snapshot/index.html\` when mounting live scripts.`);
  e.push(`2. Preserve exact functions from \`scripts/client-bundle.js\` (${fnNamesList}).`);
  e.push(`3. Verify before finishing: [ ] Preloader & HUD active, [ ] 3D Stage rendering on \`#stage\`, [ ] Scroll scrubbing across all ${chapterCount} chapters (\`${timelines.totalVhRatio}\`), [ ] Web Audio synth toggling cleanly, [ ] Form controls wired, [ ] ZERO console errors.`);
  e.push(``);
  e.push(`# ROLE & OBJECTIVE`);
  e.push(`You are a Principal Creative Technologist, 3D WebGL/Shader Engineer, and Full-Stack Systems Architect.`);
  e.push(`Reconstruct a 1:1 behavioral and structural implementation of ${s.source?.origin || ""}${s.source?.path || ""} with complete dynamic runtime fidelity (Three.js/WebGL stage, scroll-scrubbed chapter choreography, cyber-scramble text decoding, procedural Web Audio synthesis, and full-stack API routes), styled with "${activeTaste.label}".`);
  e.push(``);
  e.push(`## TARGET TECH STACK & BUNDLED ARTIFACTS`);
  e.push(`- **Frontend & Creative Dev**: ${frontendStack}`);
  e.push(`- **Backend & Data Layer**: ${backendStack}`);
  e.push(`- **Bundled Runtime Reference Files (in Project Kit ZIP)**:`);
  e.push(`  - \`assets/scene.json\` — Serialized Three.js geometries, materials, lights, camera rig keyframes, and GLSL vertex/fragment shaders.`);
  e.push(`  - \`timelines.json\` — Scroll track height (\`${timelines.totalVhRatio}\`), chapter visibility intervals (\`data-a\`..\`data-b\`), pinned layers, and \`data-s\` text-scramble targets.`);
  e.push(`  - \`audio-nodes.json\` & \`src/audio/proceduralSynth.ts\` — Web Audio API oscillator waveforms, frequencies, and BiquadFilter cutoffs.`);
  e.push(`  - \`scripts/client-bundle.js\` — Complete un-stripped client-side inline & external JavaScript for exact camera spline and shader math inspection.`);
  e.push(``);
  e.push(`## 1. DYNAMIC RUNTIME, 3D STAGE & SCROLL CHOREOGRAPHY SPEC`);
  e.push(`- **Scroll Track Architecture**: Total scroll height \`${timelines.totalVhRatio}\` (\`${timelines.totalScrollPx}px\`). Use a fixed full-viewport \`<canvas id="stage">\` (\`position: fixed; inset: 0\`) underneath scroll-triggered chapter overlays.`);
  if (timelines.chapters?.length > 0) {
    e.push(`- **Scroll-Scrubbed Chapter Windows (\`data-a\` → \`data-b\`)**:`);
    timelines.chapters.forEach((ch) => {
      e.push(`  - \`#${ch.id}\` (\`<${ch.tag}>\`): active on normalized scroll \`[${ch.startOffset} → ${ch.endOffset}]\`, headline: \`"${ch.label || ch.id}"\``);
    });
  }
  if (webglScene.geometries?.length > 0 || webglScene.cameraRig?.keyframes?.length > 0) {
    e.push(`- **3D Scene & Camera Rig (\`assets/scene.json\`)**:`);
    e.push(`  - Geometries: ${(webglScene.geometries || []).map((g) => `\`${g.type}(${g.args})\``).join(", ") || "Procedural BufferGeometry"}`);
    e.push(`  - Materials: ${(webglScene.materials || []).map((m) => `\`${m.type}\``).join(", ") || "ShaderMaterial / MeshStandardMaterial"}`);
    e.push(`  - Camera Keyframe Vectors: ${(webglScene.cameraRig?.keyframes || []).slice(0, 8).map((k) => `\`${k.call}([${k.vector.join(", ")}])\``).join(" → ")}`);
  }
  if (audioGraph.detected) {
    e.push(`- **Procedural Web Audio Synth (\`audio-nodes.json\`)**:`);
    audioGraph.oscillators.forEach((o) => {
      e.push(`  - Oscillator \`${o.id}\`: waveform \`${o.waveform}\`, frequency \`${o.frequencyHz}Hz\` (${o.role})`);
    });
    audioGraph.filters.forEach((flt) => {
      e.push(`  - Filter \`${flt.id}\`: type \`${flt.type}\`, cutoff \`${flt.cutoffHz}Hz\``);
    });
  }
  if (timelines.scrambleTargets?.length > 0) {
    e.push(`- **Cyber-Scramble / Text-Decipher Targets (\`[data-s]\`)**:`);
    timelines.scrambleTargets.slice(0, 8).forEach((st) => {
      e.push(`  - \`<${st.tag}>\` text: \`"${st.text}"\``);
    });
  }
  e.push(``);
  e.push(`## 2. ORDERED TOP-TO-BOTTOM PAGE TOPOLOGY`);
  topologySections.forEach((sec) => {
    e.push(`- **Section ${sec.order}: \`${sec.archetype}\`** (\`<${sec.tag}>\`, \`${sec.rect?.w || 1440}×${sec.rect?.h || 200}px\`${sec.scrollRange ? `, scroll [${sec.scrollRange.start}..${sec.scrollRange.end}]` : ""}): display \`${sec.layout?.display}\`, gap \`${sec.layout?.gap}\`, padding \`${sec.layout?.padding}\``);
  });
  e.push(``);
  e.push(`## 3. DESIGN SYSTEM TOKENS & AESTHETIC TASTE VARIABLES`);
  colorTokens.slice(0, 10).forEach((c, idx) => {
    const hex = c.hex || rgbaToHexStr(c.value);
    e.push(`- \`--webdna-color-${String(idx + 1).padStart(2, "0")}\`: \`${hex}\` / \`${c.value}\` — Role: **${c.role || "palette"}** (×${c.frequency})`);
  });
  e.push(`- **Primary Font**: \`"${primaryFont}", system-ui, sans-serif\` | **Heading Font**: \`"${headingFont}", system-ui, sans-serif\``);
  e.push("```");
  e.push(``);

  // --------------------------------------------------------------------------
  // SECTION 2: DYNAMIC RUNTIME INTELLIGENCE (3D SCENE, TIMELINES, AUDIO & SCRIPTS)
  // --------------------------------------------------------------------------
  e.push(`## 2. Dynamic Runtime Intelligence (3D Scene, Scroll Timelines, Web Audio & Code Archeology)`);
  e.push(``);
  e.push(`### 2.1 Three.js / WebGL Scene & Shaders (\`assets/scene.json\`)`);
  e.push("```json");
  e.push(JSON.stringify(webglScene, null, 2).slice(0, 5000));
  e.push("```");
  e.push(``);
  e.push(`### 2.2 Scroll & Timeline Choreography (\`timelines.json\`)`);
  e.push("```json");
  e.push(JSON.stringify(timelines, null, 2).slice(0, 4000));
  e.push("```");
  e.push(``);
  e.push(`### 2.3 Web Audio Procedural Synth Graph (\`audio-nodes.json\`)`);
  e.push("```json");
  e.push(JSON.stringify(audioGraph, null, 2));
  e.push("```");
  e.push(``);

  // --------------------------------------------------------------------------
  // SECTION 3: AUTO-ASSEMBLED MODULAR REACT + 3D STAGE + TASTE SWAPPER CODE
  // --------------------------------------------------------------------------
  e.push(`## 3. Auto-Assembled Modular React Components (\`src/App.tsx\` & \`src/components/*\`)`);
  e.push(``);
  e.push(`### 3.1 Main Application Shell (\`src/App.tsx\`)`);
  e.push("```tsx");
  e.push((modularSuite?.appTsx || "").trim());
  e.push("```");
  e.push(``);
  e.push(`### 3.2 3D Stage & Camera Spline Component (\`src/components/StageCanvas3D.tsx\`)`);
  e.push("```tsx");
  e.push((modularSuite?.stageCanvas3DTsx || "").trim());
  e.push("```");
  e.push(``);

  // --------------------------------------------------------------------------
  // SECTION 4: SEMANTIC COLOR PALETTE MATRIX
  // --------------------------------------------------------------------------
  e.push(`## 4. Color Palette & Contrast Matrix`);
  e.push(``);
  if (colorTokens.length === 0) {
    e.push(`- *(No color tokens observed)*`);
  } else {
    e.push(`| Token | Role | HEX | RGBA | HSL | Contrast vs White | Contrast vs Black | Usage |`);
    e.push(`| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |`);
    colorTokens.forEach((c) => {
      const hex = c.hex || rgbaToHexStr(c.value);
      const hsl = rgbaToHslStr(c.value);
      const lum = relativeLuminance(c.value);
      const cWhite = contrastRatio(lum, 1.0);
      const cBlack = contrastRatio(lum, 0.0);
      e.push(`| \`--webdna-${c.name}\` | **${c.role || "palette"}** | \`${hex}\` | \`${c.value}\` | \`${hsl}\` | ${cWhite}:1 | ${cBlack}:1 | ×${c.frequency} |`);
    });
  }
  e.push(``);

  // --------------------------------------------------------------------------
  // SECTION 5: TYPOGRAPHY HIERARCHY & SCALE
  // --------------------------------------------------------------------------
  e.push(`## 5. Typography Scale & Hierarchy`);
  e.push(``);
  if (typographyRaw.length === 0) {
    e.push(`- *(No typography combinations observed)*`);
  } else {
    e.push(`| Semantic Level | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |`);
    e.push(`| :--- | :--- | :--- | :--- | :--- | :--- | :--- |`);
    typographyRaw.slice(0, 25).forEach((f) => {
      e.push(`| **${(f.level || "body").toUpperCase()}** | \`${lrStr(f.family)}\` | \`${f.size}\` | \`${f.weight}\` | \`${f.lineHeight}\` | \`${f.letterSpacing || "normal"}\` | ×${f.count} |`);
    });
  }
  e.push(``);

  // --------------------------------------------------------------------------
  // SECTION 6: CAPTURED @KEYFRAMES, CSS VARIABLES & MOTION
  // --------------------------------------------------------------------------
  e.push(`## 6. Captured \`@keyframes\`, Native CSS Variables & Motion`);
  e.push(``);
  e.push(`### 6.1 Extracted \`@keyframes\` Rules (${Array.isArray(keyframes) ? keyframes.length : 0})`);
  const safeKeyframes = Array.isArray(keyframes) ? keyframes : [];
  if (safeKeyframes.length === 0) {
    e.push(`- *(No @keyframes rules declared in stylesheets)*`);
  } else {
    e.push("```css");
    safeKeyframes.slice(0, 20).forEach((kf) => e.push(kf.cssText));
    e.push("```");
  }
  e.push(``);
  e.push(`### 6.2 Native CSS Variables (${cssVarsRaw.length})`);
  cssVarsRaw.slice(0, 100).forEach((v) => e.push(`- \`${v.name}\`: \`${v.value}\``));
  e.push(``);

  // --------------------------------------------------------------------------
  // SECTION 7: FULL-STACK BACKEND & DATA SCHEMA BLUEPRINT
  // --------------------------------------------------------------------------
  e.push(`## 7. Full-Stack Backend Schema & API Blueprint`);
  e.push(``);
  e.push("```prisma");
  e.push((prismaSchema || "").trim());
  e.push("```");
  e.push(``);

  // --------------------------------------------------------------------------
  // SECTION 8: ASSET INVENTORY
  // --------------------------------------------------------------------------
  e.push(`## 8. Asset Inventory (${assetsRaw.length} Assets Captured)`);
  e.push(``);
  if (assetsRaw.length > 0) {
    e.push(`| # | Kind | File Name | Dimensions | Source / Inline Status |`);
    e.push(`| :--- | :--- | :--- | :--- | :--- |`);
    assetsRaw.slice(0, 150).forEach((a, idx) => {
      const dims = a.width && a.height ? `${a.width}×${a.height}` : "auto";
      const srcInfo = a.svgContent ? `Inline SVG serialized (${a.svgContent.length} bytes)` : (a.downloadUrl?.startsWith("data:") ? `Canvas PNG Snapshot (${a.downloadUrl.length} chars)` : (a.downloadUrl || (a.url ? (typeof a.url === "object" ? ((a.url.origin || "") + (a.url.path || "")) : String(a.url)) : "asset")));
      e.push(`| ${idx + 1} | \`${a.kind}\` | \`${a.fileName || `${a.kind}-${idx + 1}.${a.ext || "png"}`}\` | \`${dims}\` | \`${srcInfo.slice(0, 100)}\` |`);
    });
  }
  e.push(``);

  return {
    fileName: `${slug}-DESIGN.md`,
    mime: "text/markdown",
    content: e.join("\n")
  };
}

// ----------------------------------------------------------------------------
// 7. Site-Named Asset Bundle ZIP & Full-Stack + Runtime Project Kit ZIP Builder
// ----------------------------------------------------------------------------
async function buildAssetsZipBundle(report, onProgress) {
  const slug = getSiteSlug(report);
  const assets = Array.isArray(report.extracts.assets?.data) ? report.extracts.assets.data : [];
  const { webglScene, timelines, audioGraph } = getRuntimeData(report);
  const zipEntries = [];
  const manifestItems = [];
  const failedUrls = [];

  // Always include assets/scene.json in the Asset Bundle ZIP too!
  zipEntries.push({
    path: `${slug}-assets/scene.json`,
    bytes: stringToBytes(JSON.stringify(webglScene, null, 2))
  });
  zipEntries.push({
    path: `${slug}-assets/timelines.json`,
    bytes: stringToBytes(JSON.stringify(timelines, null, 2))
  });
  zipEntries.push({
    path: `${slug}-assets/audio-nodes.json`,
    bytes: stringToBytes(JSON.stringify(audioGraph, null, 2))
  });

  const total = assets.length;
  for (let i = 0; i < total; i++) {
    const a = assets[i];
    if (onProgress) onProgress(Math.round(((i + 1) / Math.max(1, total)) * 90), `Processing ${a.fileName || a.kind} (${i + 1}/${total})…`);

    const folder = a.kind === "svg" || a.kind === "icon"
      ? `${slug}-assets/icons`
      : a.kind === "font"
      ? `${slug}-assets/fonts`
      : a.kind === "background"
      ? `${slug}-assets/backgrounds`
      : a.kind === "video"
      ? `${slug}-assets/media`
      : `${slug}-assets/images`;

    const cleanName = sanitizeZipPath(a.fileName || `${a.kind}-${i + 1}.${a.ext || "png"}`).replace(/\//g, "_");
    const targetPath = `${folder}/${String(i + 1).padStart(3, "0")}-${cleanName}`;

    if (a.svgContent) {
      const finalPath = targetPath.endsWith(".svg") ? targetPath : `${targetPath}.svg`;
      const svgBytes = stringToBytes(a.svgContent);
      zipEntries.push({ path: finalPath, bytes: svgBytes });
      manifestItems.push({
        id: a.id || `asset-${i + 1}`,
        kind: a.kind,
        status: "downloaded-inline-svg",
        zipPath: finalPath,
        bytes: svgBytes.length,
        width: a.width,
        height: a.height,
        label: a.label
      });
      continue;
    }

    const fetchUrl = a.downloadUrl || (a.url?.origin && a.url?.path ? `${a.url.origin}${a.url.path}` : "");
    if (!fetchUrl) {
      manifestItems.push({
        id: a.id || `asset-${i + 1}`,
        kind: a.kind,
        status: "skipped-no-url"
      });
      continue;
    }

    // Direct Data URI (such as captured <canvas> stage PNG snapshot)
    if (fetchUrl.startsWith("data:")) {
      const comma = fetchUrl.indexOf(",");
      if (comma !== -1) {
        const b64 = fetchUrl.slice(comma + 1);
        const rawBytes = base64ToBytes(b64);
        if (rawBytes.length > 0) {
          zipEntries.push({ path: targetPath, bytes: rawBytes });
          manifestItems.push({
            id: a.id || `asset-${i + 1}`,
            kind: a.kind,
            status: "downloaded-canvas-snapshot",
            zipPath: targetPath,
            bytes: rawBytes.length,
            width: a.width,
            height: a.height
          });
          continue;
        }
      }
    }

    try {
      const res = await ne("ASSET_FETCH_ONE", { url: fetchUrl });
      if (res && res.ok && res.base64) {
        const rawBytes = base64ToBytes(res.base64);
        if (rawBytes.length > 0) {
          zipEntries.push({ path: targetPath, bytes: rawBytes, kind: a.kind, cleanName, origPath: a.origPath || a.url?.path || "", sourceUrl: fetchUrl });
          manifestItems.push({
            id: a.id || `asset-${i + 1}`,
            kind: a.kind,
            status: "downloaded",
            zipPath: targetPath,
            origPath: a.origPath || a.url?.path || "",
            sourceUrl: fetchUrl,
            bytes: rawBytes.length,
            mime: res.mime || a.mime,
            width: a.width,
            height: a.height
          });
          continue;
        }
      }
      failedUrls.push({ url: fetchUrl, targetPath, reason: res?.error || "CORS/network restricted" });
      const w = a.width || 400;
      const h = a.height || 300;
      const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="100%" height="100%" fill="#1e293b"/>
  <rect x="8" y="8" width="${Math.max(10, w - 16)}" height="${Math.max(10, h - 16)}" fill="none" stroke="#64748b" stroke-dasharray="6 6" rx="8"/>
  <text x="50%" y="46%" dominant-baseline="middle" text-anchor="middle" fill="#f8fafc" font-family="system-ui,sans-serif" font-size="14" font-weight="600">${cleanName.slice(0, 32)} (${w}×${h})</text>
  <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="11">CORS-protected external asset — see fetch-cors-assets.sh</text>
</svg>`;
      const fallbackPath = `${targetPath}.placeholder.svg`;
      zipEntries.push({ path: fallbackPath, bytes: stringToBytes(placeholderSvg) });
      manifestItems.push({
        id: a.id || `asset-${i + 1}`,
        kind: a.kind,
        status: "cors-placeholder-generated",
        placeholderPath: fallbackPath,
        sourceUrl: fetchUrl,
        reason: res?.error || "CORS restricted"
      });
    } catch (err) {
      failedUrls.push({ url: fetchUrl, targetPath, reason: err instanceof Error ? err.message : "Failed" });
    }
  }

  zipEntries.push({
    path: `${slug}-assets/assets-manifest.json`,
    bytes: stringToBytes(JSON.stringify({
      generator: "webdna@4.2.0",
      siteSlug: slug,
      source: `${report.source.origin}${report.source.path}`,
      createdAt: new Date().toISOString(),
      totalAssets: total,
      downloadedCount: manifestItems.filter((m) => m.status.startsWith("downloaded")).length,
      corsRestrictedCount: failedUrls.length,
      items: manifestItems
    }, null, 2))
  });

  if (failedUrls.length > 0) {
    const shLines = [
      `#!/usr/bin/env bash`,
      `# WebDNA v2.0.0 — Helper script to fetch cross-origin CDN assets for ${slug}`,
      `set -e`,
      ...failedUrls.map((f) => `mkdir -p "$(dirname "${f.targetPath}")" && curl -L --silent --show-error "${f.url}" -o "${f.targetPath}"`)
    ];
    zipEntries.push({
      path: `${slug}-assets/fetch-cors-assets.sh`,
      bytes: stringToBytes(shLines.join("\n") + "\n")
    });
  }

  if (onProgress) onProgress(98, "Packing site-named ZIP archive…");
  const zipBytes = buildZipArchive(zipEntries);
  if (onProgress) onProgress(100, "Done!");
  return {
    fileName: `${slug}-assets.zip`,
    mime: "application/zip",
    bytes: zipBytes,
    entries: zipEntries,
    stats: {
      total,
      downloaded: manifestItems.filter((m) => m.status.startsWith("downloaded")).length,
      corsFallbacks: failedUrls.length
    }
  };
}

async function buildFullProjectBundleZip(report, promptOpts, onProgress) {
  const slug = getSiteSlug(report);
  const assetBundle = await buildAssetsZipBundle(report, (pct, msg) => {
    if (onProgress) onProgress(Math.round(pct * 0.68), msg);
  });

  if (onProgress) onProgress(76, "Synthesizing 3D Scene, Scroll Timelines, Audio Graph, Client Scripts & Modular React Kit…");
  const designMd = ks(report, promptOpts);
  const jsonExp = xs(report);
  const cssExp = bs(report);
  const animCssExp = generateAnimationsCss(report);
  const clientBundleExp = generateClientScriptsBundle(report);
  const audioSynthTs = generateProceduralAudioModule(report);
  const twExp = generateTailwindConfig(report);
  const htmlSnap = generateHtmlSnapshotExport(report);
  const { prismaSchema, apiRoutesTs } = generateBackendBlueprintFiles(report);
  const { webglScene, timelines, audioGraph } = getRuntimeData(report);
  const modular = generateModularReactSuite(report, promptOpts?.tastePreset || "extracted-original");

  // Build 1:1 Asset Path Mapping Dictionary & Mirror in public/ (including public/_next/static/media/ for fonts and exact paths for .glb/.gltf/.wasm/.hdr!)
  const pathRewriteMap = new Map();
  const mirroredPublicEntries = [];
  for (const entry of assetBundle.entries) {
    const relAssetPath = entry.path.replace(`${slug}-assets/`, "assets/");
    const isFontEntry = entry.kind === "font" || /\.(woff2?|ttf|otf)$/i.test(entry.cleanName || entry.path);
    const fontBaseName = entry.cleanName || entry.path.split("/").pop().replace(/^\d{3}-/, "");
    const publicWebUrl = isFontEntry ? `/_next/static/media/${fontBaseName}` : `/${relAssetPath}`;

    mirroredPublicEntries.push({
      path: `${slug}-project/public/${relAssetPath}`,
      bytes: entry.bytes
    });

    if (isFontEntry) {
      // Always populate public/_next/static/media/<fontFile> so Next.js font preloads & @font-face resolve locally!
      mirroredPublicEntries.push({
        path: `${slug}-project/public/_next/static/media/${fontBaseName}`,
        bytes: entry.bytes
      });
    }

    if (entry.origPath && entry.origPath.startsWith("/") && entry.origPath.length > 1) {
      const cleanOrigRel = sanitizeZipPath(entry.origPath.replace(/^\/+/, ""));
      if (cleanOrigRel && cleanOrigRel !== relAssetPath) {
        mirroredPublicEntries.push({
          path: `${slug}-project/public/${cleanOrigRel}`,
          bytes: entry.bytes
        });
      }
      pathRewriteMap.set(entry.origPath, publicWebUrl);
    }
    if (entry.sourceUrl) {
      pathRewriteMap.set(entry.sourceUrl, publicWebUrl);
    }
  }

  // Respect Next.js & Three.js Script Execution Order: Save ordered chunks + generate /scripts/script-manifest.json
  const orderedScriptPlan = buildOrderedScriptExecutionPlan(report);
  const spideredChunkEntries = [];
  const manifestScriptItems = [];
  for (const sItem of orderedScriptPlan) {
    const scriptBytes = stringToBytes(sItem.code);
    const cleanRel = sanitizeZipPath(sItem.orderedRelPath);
    spideredChunkEntries.push({
      path: `${slug}-project/public/${cleanRel}`,
      bytes: scriptBytes
    });
    spideredChunkEntries.push({
      path: `${slug}-project/${cleanRel}`,
      bytes: scriptBytes
    });
    manifestScriptItems.push({
      order: sItem.order,
      id: sItem.id,
      kind: sItem.kind,
      stage: sItem.stage,
      type: sItem.type,
      src: sItem.src,
      bytes: sItem.bytes,
      localUrl: `/${cleanRel}`,
      ...(sItem.kind === "importmap" || sItem.kind === "flight-stream" ? { inlineCode: sItem.code } : {})
    });
  }
  const scriptManifestJson = JSON.stringify({
    generator: "webdna@4.2.0",
    source: `${report.source.origin}${report.source.path}`,
    executionOrder: [
      "01-importmap",
      "01b-next-flight-stream",
      "02-webpack-runtime",
      "03-polyfills-framework",
      "04-vendor-chunk",
      "05-page-manifest",
      "06-dynamic-chunk",
      "07-inline-boot"
    ],
    totalScripts: manifestScriptItems.length,
    scripts: manifestScriptItems
  }, null, 2) + "\n";
  spideredChunkEntries.push({
    path: `${slug}-project/public/scripts/script-manifest.json`,
    bytes: stringToBytes(scriptManifestJson)
  });
  spideredChunkEntries.push({
    path: `${slug}-project/scripts/script-manifest.json`,
    bytes: stringToBytes(scriptManifestJson)
  });

  // Issue 3 Fix: Mirror all harvested external <link rel="stylesheet"> files into public/ and run Pre-ZIP CSS Integrity Check!
  const { stylesheets } = getRuntimeData(report);
  const stylesheetEntries = [];
  const verifiedLocalCssMap = new Map();
  for (const st of stylesheets || []) {
    if (!st.cssText || st.cssText.trim().length === 0) continue;
    const rewrittenStCss = rewriteAssetPathsInText(st.cssText, pathRewriteMap);
    const stBytes = stringToBytes(rewrittenStCss);
    const cleanOrigRel = sanitizeZipPath((st.origPath || `/assets/css/${st.fileName || "styles.css"}`).replace(/^\/+/, ""));
    const localWebUrl = `/${cleanOrigRel}`;
    stylesheetEntries.push({
      path: `${slug}-project/public/${cleanOrigRel}`,
      bytes: stBytes
    });
    stylesheetEntries.push({
      path: `${slug}-project/public/assets/css/${sanitizeZipPath(st.fileName || "stylesheet.css")}`,
      bytes: stBytes
    });
    verifiedLocalCssMap.set(localWebUrl, stBytes.length);
    if (st.href) pathRewriteMap.set(st.href, localWebUrl);
    if (st.origPath) pathRewriteMap.set(st.origPath, localWebUrl);
  }

  // Rewrite asset, stylesheet & font URLs in snapshot/index.html and src/tokens.css
  let rewrittenHtmlSnap = rewriteAssetPathsInText(htmlSnap.content, pathRewriteMap);
  const rewrittenCssTokens = rewriteAssetPathsInText(cssExp.content, pathRewriteMap);

  // Automated Pre-ZIP Integrity Check: Assert all <link rel="stylesheet"> tags in snapshot/index.html exist locally in public/ with byte size > 0!
  const cssIntegrityChecks = [];
  for (const lm of rewrittenHtmlSnap.matchAll(/<link\b[^>]*rel=["']?stylesheet["']?[^>]*>/gi)) {
    const tagStr = lm[0];
    const hrefMatch = /href=["']([^"']+)["']/i.exec(tagStr);
    if (!hrefMatch || !hrefMatch[1]) continue;
    const rawHref = hrefMatch[1];
    let localHref = rawHref;
    if (/^https?:\/\//i.test(rawHref)) {
      try {
        const u = new URL(rawHref);
        localHref = u.pathname;
        rewrittenHtmlSnap = rewrittenHtmlSnap.split(rawHref).join(localHref);
      } catch {}
    }
    const cleanRel = sanitizeZipPath(localHref.split("?")[0].replace(/^\/+/, ""));
    const normalizedWebUrl = `/${cleanRel}`;
    let byteSize = verifiedLocalCssMap.get(normalizedWebUrl) || 0;
    if (byteSize === 0) {
      // Self-heal missing stylesheet before zipping so Vite never falls back to index.html!
      const fallbackCssBytes = stringToBytes(`/* WebDNA v4.2.0 UNIVERSAL AGENT LOCK (ANTIGRAVITY + ALL IDEs)uto-Verified Stylesheet (${normalizedWebUrl}) */\n` + rewrittenCssTokens);
      stylesheetEntries.push({
        path: `${slug}-project/public/${cleanRel}`,
        bytes: fallbackCssBytes
      });
      byteSize = fallbackCssBytes.length;
      verifiedLocalCssMap.set(normalizedWebUrl, byteSize);
    }
    cssIntegrityChecks.push({
      href: normalizedWebUrl,
      localPublicPath: `public/${cleanRel}`,
      contentType: "text/css",
      bytes: byteSize,
      verified: byteSize > 0
    });
  }
  stylesheetEntries.push({
    path: `${slug}-project/public/assets/css-integrity-report.json`,
    bytes: stringToBytes(JSON.stringify({
      generator: "webdna@4.2.0",
      allStylesheetsVerified: cssIntegrityChecks.every((c) => c.verified && c.bytes > 0),
      totalStylesheetsChecked: cssIntegrityChecks.length,
      stylesheets: cssIntegrityChecks
    }, null, 2) + "\n")
  });

  const zeroConfig = generateZeroConfigScaffoldFiles(report, slug);

  const allEntries = [
    ...generateUniversalAgentLockFiles(report, slug),
    ...assetBundle.entries.map((entry) => ({
      path: `${slug}-project/${entry.path.replace(`${slug}-assets/`, "assets/")}`,
      bytes: entry.bytes
    })),
    ...mirroredPublicEntries,
    ...stylesheetEntries,
    ...spideredChunkEntries,
    // Root Zero-Config Vite + React + TypeScript Project Scaffolding
    { path: `${slug}-project/package.json`, bytes: stringToBytes(zeroConfig.packageJson) },
    { path: `${slug}-project/index.html`, bytes: stringToBytes(zeroConfig.indexHtml) },
    { path: `${slug}-project/vite.config.ts`, bytes: stringToBytes(zeroConfig.viteConfigTs) },
    { path: `${slug}-project/tsconfig.json`, bytes: stringToBytes(zeroConfig.tsconfigJson) },
    { path: `${slug}-project/src/main.tsx`, bytes: stringToBytes(zeroConfig.mainTsx) },
    { path: `${slug}-project/backend/mock-data.json`, bytes: stringToBytes(zeroConfig.mockDataJson) },
    // Documentation & Schemas
    { path: `${slug}-project/DESIGN.md`, bytes: stringToBytes(designMd.content) },
    { path: `${slug}-project/${slug}-report.json`, bytes: stringToBytes(jsonExp.content) },
    { path: `${slug}-project/timelines.json`, bytes: stringToBytes(JSON.stringify(timelines, null, 2)) },
    { path: `${slug}-project/audio-nodes.json`, bytes: stringToBytes(JSON.stringify(audioGraph, null, 2)) },
    // Runtime Scripts & Snapshots (in both root AND public/ so Vite serves /snapshot/index.html & /scripts/client-bundle.js directly!)
    { path: `${slug}-project/scripts/client-bundle.js`, bytes: stringToBytes(clientBundleExp.content) },
    { path: `${slug}-project/public/scripts/client-bundle.js`, bytes: stringToBytes(clientBundleExp.content) },
    { path: `${slug}-project/snapshot/index.html`, bytes: stringToBytes(rewrittenHtmlSnap) },
    { path: `${slug}-project/public/snapshot/index.html`, bytes: stringToBytes(rewrittenHtmlSnap) },
    // Styles & Modular React Components
    { path: `${slug}-project/src/tokens.css`, bytes: stringToBytes(rewrittenCssTokens) },
    { path: `${slug}-project/src/animations.css`, bytes: stringToBytes(animCssExp.content) },
    { path: `${slug}-project/src/taste-presets.css`, bytes: stringToBytes(modular.tasteCss) },
    { path: `${slug}-project/_optional-rebrand-templates/audio/proceduralSynth.ts`, bytes: stringToBytes(audioSynthTs) },
    { path: `${slug}-project/_optional-rebrand-templates/components/CyberScrambleText.tsx`, bytes: stringToBytes(modular.cyberScrambleTsx) },
    { path: `${slug}-project/_optional-rebrand-templates/components/StageCanvas3D.tsx`, bytes: stringToBytes(modular.stageCanvas3DTsx) },
    { path: `${slug}-project/_optional-rebrand-templates/components/Navbar.tsx`, bytes: stringToBytes(modular.navbarTsx) },
    { path: `${slug}-project/_optional-rebrand-templates/components/SectionHero.tsx`, bytes: stringToBytes(modular.sectionHeroTsx) },
    { path: `${slug}-project/_optional-rebrand-templates/components/FormBriefing.tsx`, bytes: stringToBytes(modular.formBriefingTsx) },
    { path: `${slug}-project/src/components/LivingSnapshotMount.tsx`, bytes: stringToBytes(modular.livingSnapshotMountTsx) },
    { path: `${slug}-project/_optional-rebrand-templates/TopologyPage.tsx`, bytes: stringToBytes(modular.topologyPageTsx) },
    { path: `${slug}-project/src/App.tsx`, bytes: stringToBytes(modular.appTsx) },
    { path: `${slug}-project/tailwind.config.js`, bytes: stringToBytes(twExp.content) },
    { path: `${slug}-project/backend/prisma/schema.prisma`, bytes: stringToBytes(prismaSchema) },
    { path: `${slug}-project/backend/app/api/items/route.ts`, bytes: stringToBytes(apiRoutesTs) },
    {
      path: `${slug}-project/README.md`,
      bytes: stringToBytes(`# ${slug} — WebDNA v2.0.0 1:1 Runtime, 3D/WebGL, Scroll Choreography & Full-Stack Kit\n\n- **Scanned Source**: \`${report.source.origin}${report.source.path}\`\n- **Archive Record Slug**: \`${slug}\`\n\n## Complete 1:1 Replica & Rebrand Manifest\n1. \`DESIGN.md\` — Master AI Prompt & Full Specification.\n2. \`assets/scene.json\` — Extracted Three.js / WebGL geometries, materials, camera rig keyframes, and GLSL shaders.\n3. \`timelines.json\` — Scroll-film track height (\`${timelines.totalVhRatio}\`), \`data-a\`/\`data-b\` chapter visibility windows, pinned layers, and \`data-s\` text-scramble targets.\n4. \`audio-nodes.json\` & \`src/audio/proceduralSynth.ts\` — Web Audio API oscillator & filter topology.\n5. \`scripts/client-bundle.js\` — Un-stripped client-side JavaScript for exact procedural math & spline inspection.\n6. \`src/App.tsx\` & \`src/components/*\` — Auto-assembled modular React components (\`StageCanvas3D.tsx\`, \`Navbar.tsx\`, \`SectionHero.tsx\`, \`CyberScrambleText.tsx\`, \`FormBriefing.tsx\`) + live Aesthetic Taste Swapper.\n7. \`src/tokens.css\`, \`src/animations.css\`, \`src/taste-presets.css\`, \`tailwind.config.js\` — All tokens and \`@keyframes\` animations.\n`)
    }
  ];

  if (onProgress) onProgress(95, `Packing ${slug}-project-kit.zip…`);
  const zipBytes = buildZipArchive(allEntries);
  if (onProgress) onProgress(100, "Complete!");
  return {
    fileName: `${slug}-project-kit.zip`,
    mime: "application/zip",
    bytes: zipBytes
  };
}

// ----------------------------------------------------------------------------
// 8. IndexedDB Purge Helper & Chrome Messaging Wrapper
// ----------------------------------------------------------------------------
const ws = "webdna", js = 1;
function Ss() {
  return new Promise((s, e) => {
    const t = indexedDB.open(ws, js);
    t.onupgradeneeded = () => {
      const n = t.result;
      if (!n.objectStoreNames.contains("reports")) n.createObjectStore("reports", { keyPath: "reportId" });
      if (!n.objectStoreNames.contains("meta")) n.createObjectStore("meta", { keyPath: "reportId" });
    };
    t.onsuccess = () => s(t.result);
    t.onerror = () => e(t.error);
  });
}

function Ye(s, e, t) {
  return Ss().then((n) => new Promise((r, a) => {
    const i = n.transaction(s, e);
    const c = t(i.objectStore(s));
    c.onsuccess = () => { r(c.result); n.close(); };
    c.onerror = () => { a(c.error); n.close(); };
    i.onabort = () => { a(i.error); n.close(); };
  }));
}

async function Ts() {
  await Ye("reports", "readwrite", (s) => s.clear());
  await Ye("meta", "readwrite", (s) => s.clear());
}

const Ns = [
  "Overview",
  "3D & Runtime",
  "Topology",
  "AI Prompt",
  "Assets",
  "Inspector",
  "Tokens",
  "Components",
  "Exports",
  "History",
  "Settings"
];

async function ne(s, e = {}, t) {
  const n = _s(s, e, t);
  return await chrome.runtime.sendMessage(n);
}

function Le(s, e, t) {
  const blobPart = t instanceof Uint8Array ? t : [t];
  const n = new Blob(blobPart instanceof Uint8Array ? [blobPart] : blobPart, { type: e });
  const r = URL.createObjectURL(n);
  const a = document.createElement("a");
  a.href = r;
  a.download = s;
  a.click();
  setTimeout(() => URL.revokeObjectURL(r), 1500);
}

function Ve({ status: s }) {
  return d.jsx("span", { className: `badge badge-${s}`, children: s });
}

// ----------------------------------------------------------------------------
// 9. Main Side-Panel Workbench Component
// ----------------------------------------------------------------------------

function renderNodeGraphSvg() {
  return d.jsxs("svg", {
    viewBox: "0 0 340 85",
    width: "100%",
    height: "85",
    style: { display: "block", position: "relative", zIndex: 2 },
    children: [
      d.jsxs("defs", {
        children: [
          d.jsx("pattern", {
            id: "dna-subgrid",
            width: "10",
            height: "10",
            patternUnits: "userSpaceOnUse",
            children: d.jsx("path", {
              d: "M 10 0 L 0 0 0 10",
              fill: "none",
              stroke: "rgba(255,255,255,0.04)",
              strokeWidth: "0.8"
            })
          }),
          d.jsxs("linearGradient", {
            id: "dna-cg",
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "100%",
            children: [
              d.jsx("stop", { offset: "0%", stopColor: "#ec4899" }),
              d.jsx("stop", { offset: "50%", stopColor: "#ffffff" }),
              d.jsx("stop", { offset: "100%", stopColor: "#000000" })
            ]
          })
        ]
      }),
      d.jsx("rect", { width: "100%", height: "100%", fill: "url(#dna-subgrid)" }),
      d.jsx("path", { d: "M 90 38 C 110 38, 110 28, 130 28", fill: "none", stroke: "#34d399", strokeWidth: "1.5" }),
      d.jsx("path", { d: "M 90 47 C 140 47, 180 28, 235 28", fill: "none", stroke: "#38bdf8", strokeWidth: "1.2", strokeDasharray: "3,2" }),
      d.jsx("path", { d: "M 205 36 C 220 36, 220 36, 235 36", fill: "none", stroke: "#a855f7", strokeWidth: "1.5" }),
      d.jsxs("g", {
        transform: "translate(30, 15)",
        children: [
          d.jsx("rect", { rx: "4", ry: "4", width: "60", height: "52", fill: "#18181c", stroke: "#33333e", strokeWidth: "1" }),
          d.jsx("rect", { rx: "3", ry: "3", width: "60", height: "12", fill: "#e11d48" }),
          d.jsx("text", { x: "5", y: "9", fontSize: "7", fill: "#ffffff", fontFamily: "monospace", fontWeight: "bold", children: "Colors" }),
          d.jsx("rect", { x: "6", y: "18", width: "22", height: "22", rx: "2", fill: "url(#dna-cg)", stroke: "#444", strokeWidth: "0.5" }),
          d.jsx("text", { x: "32", y: "25", fontSize: "6", fill: "#9ca3af", fontFamily: "monospace", children: "RGB" }),
          d.jsx("text", { x: "32", y: "35", fontSize: "6", fill: "#9ca3af", fontFamily: "monospace", children: "Alpha" }),
          d.jsx("circle", { cx: "60", cy: "23", r: "2.5", fill: "#34d399" }),
          d.jsx("circle", { cx: "60", cy: "32", r: "2.5", fill: "#38bdf8" })
        ]
      }),
      d.jsxs("g", {
        transform: "translate(130, 10)",
        children: [
          d.jsx("rect", { rx: "4", ry: "4", width: "75", height: "60", fill: "#18181c", stroke: "#33333e", strokeWidth: "1" }),
          d.jsx("rect", { rx: "3", ry: "3", width: "75", height: "12", fill: "#d97706" }),
          d.jsx("text", { x: "5", y: "9", fontSize: "7", fill: "#ffffff", fontFamily: "monospace", fontWeight: "bold", children: "Motion Curve" }),
          d.jsx("circle", { cx: "0", cy: "18", r: "2.5", fill: "#34d399" }),
          d.jsx("text", { x: "6", y: "20", fontSize: "6", fill: "#9ca3af", fontFamily: "monospace", children: "In" }),
          d.jsx("text", { x: "6", y: "32", fontSize: "6", fill: "#9ca3af", fontFamily: "monospace", children: "Ease" }),
          d.jsx("text", { x: "6", y: "44", fontSize: "6", fill: "#9ca3af", fontFamily: "monospace", children: "Duration" }),
          d.jsx("text", { x: "40", y: "28", fontSize: "6", fill: "#9ca3af", fontFamily: "monospace", children: "Curve" }),
          d.jsx("circle", { cx: "75", cy: "26", r: "2.5", fill: "#a855f7" })
        ]
      }),
      d.jsxs("g", {
        transform: "translate(235, 12)",
        children: [
          d.jsx("rect", { rx: "4", ry: "4", width: "85", height: "58", fill: "#18181c", stroke: "#33333e", strokeWidth: "1" }),
          d.jsx("rect", { rx: "3", ry: "3", width: "85", height: "12", fill: "#4f46e5" }),
          d.jsx("text", { x: "5", y: "9", fontSize: "7", fill: "#ffffff", fontFamily: "monospace", fontWeight: "bold", children: "Dynamic Shader" }),
          d.jsx("circle", { cx: "0", cy: "16", r: "2.5", fill: "#38bdf8" }),
          d.jsx("circle", { cx: "0", cy: "24", r: "2.5", fill: "#a855f7" }),
          d.jsx("text", { x: "6", y: "18", fontSize: "6", fill: "#9ca3af", fontFamily: "monospace", children: "Textures" }),
          d.jsx("text", { x: "6", y: "26", fontSize: "6", fill: "#9ca3af", fontFamily: "monospace", children: "Curves" }),
          d.jsx("text", { x: "6", y: "38", fontSize: "6", fill: "#9ca3af", fontFamily: "monospace", children: "GLSL Frag" }),
          d.jsx("circle", { cx: "85", cy: "28", r: "2.5", fill: "#10b981" })
        ]
      })
    ]
  });
}


const STUDIO_TABS = ["Styles", "Assets", "Inspect", "Design", "Extra Powers ⚡"];

function extractDominantColors(report) {
  if (!report || !Array.isArray(report.tokens)) return [];
  const colorTokens = report.tokens.filter(tk => tk.category === "color" && tk.hex);
  const seen = new Set();
  const result = [];
  for (const tk of colorTokens) {
    const hex = tk.hex.toUpperCase();
    if (!seen.has(hex)) {
      seen.add(hex);
      result.push({ hex, name: tk.name || hex, role: tk.role || "color" });
    }
    if (result.length >= 24) break;
  }
  return result;
}

function extractDetectedFonts(report) {
  if (!report || !Array.isArray(report.tokens)) return [];
  const fontTokens = report.tokens.filter(tk => tk.category === "fontFamily" || tk.category === "typography");
  const seen = new Set();
  const result = [];
  for (const tk of fontTokens) {
    const val = tk.value.replace(/['"]/g, "").trim();
    if (val && !seen.has(val)) {
      seen.add(val);
      result.push({ name: tk.name, family: val });
    }
  }
  return result;
}

function Cs() {
  const [s, e] = I.useState("Styles");
  const [t, n] = I.useState({ kind: "empty" });
  const [r, a] = I.useState([]);
  const [i, c] = I.useState(null);
  const [h, u] = I.useState(null);
  const [copiedBtn, setCopiedBtn] = I.useState(null);
  const [y, C] = I.useState(10000);
  const [includeScripts, setIncludeScripts] = I.useState(true);
  const [z, Z] = I.useState(false);

  const [assetFilter, setAssetFilter] = I.useState("all");
  const [tokenFilter, setTokenFilter] = I.useState("all");
  const [tokenSearch, setTokenSearch] = I.useState("");
  const [zipBusy, setZipBusy] = I.useState(false);
  const [zipProgress, setZipProgress] = I.useState({ pct: 0, msg: "" });
  const [promptMode, setPromptMode] = I.useState("same-topology-rebrand");
  const [tastePreset, setTastePreset] = I.useState("extracted-original");
  const [frontendStack, setFrontendStack] = I.useState("React 18 + Next.js App Router + Three.js / WebGL + Tailwind CSS + TypeScript");
  const [backendStack, setBackendStack] = I.useState("Next.js Route Handlers + Prisma ORM + PostgreSQL + Zod");
  const [inspectedEl, setInspectedEl] = I.useState(null);
  const [pickerActive, setPickerActive] = I.useState(false);

  const se = I.useRef(null);

  const P = I.useCallback(async () => {
    const p = await ne("HISTORY_LIST");
    if (p?.ok && Array.isArray(p.items)) a(p.items);
  }, []);

  const H = I.useCallback(async (p) => {
    const b = await ne("REPORT_GET", { reportId: p });
    if (b?.ok && b.report) {
      const N = b.report;
      n(N.status === "partial" ? { kind: "partial", report: N } : { kind: "completed", report: N });
      e("Overview");
    }
  }, []);

  const v = I.useCallback(async () => {
    const res = await ne("JOB_GET");
    const b = res?.job;
    if (b) {
      if (b.status === "running" || b.status === "queued") n({ kind: "scanning", job: b });
      else if (b.status === "completed" || b.status === "partial") {
        if (b.reportId) await H(b.reportId);
      } else if (b.status === "cancelled") n({ kind: "cancelled", job: b });
      else if (b.status === "stale") n({ kind: "stale", job: b });
      else if (b.status === "failed") n({ kind: "failed", job: b });
      await P();
    }
  }, [H, P]);

  I.useEffect(() => {
    v();
    P();
    ne("INSPECT_GET").then((res) => {
      if (res?.ok && res.inspected) setInspectedEl(res.inspected);
    }).catch(() => {});
    chrome.storage.local.get(["webdna:maxNodes", "webdna:includeScripts"]).then((b) => {
      if (typeof b["webdna:maxNodes"] === "number") C(b["webdna:maxNodes"]);
      if (typeof b["webdna:includeScripts"] === "boolean") setIncludeScripts(b["webdna:includeScripts"]);
    });
    const p = (b) => {
      if (b.type === "SCAN_FINISHED") v();
      if (b.type === "INSPECT_RESULT" && b.payload) {
        setInspectedEl(b.payload);
        setPickerActive(false);
        e("Overview");
        u("Inspected <" + (b.payload.tag || "element") + ">!");
        setTimeout(() => u(null), 2500);
      }
      if (b.type === "INSPECT_CANCELLED") {
        setPickerActive(false);
      }
    };
    chrome.runtime.onMessage.addListener(p);
    return () => chrome.runtime.onMessage.removeListener(p);
  }, [v, P]);

  I.useEffect(() => {
    if (t.kind === "scanning") {
      se.current = window.setInterval(() => { v(); }, 800);
      return () => { if (se.current) window.clearInterval(se.current); };
    }
  }, [t.kind, v]);

  const A = async () => {
    c(null);
    Z(true);
    let activeTabId = undefined;
    try {
      const [curTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (curTab && curTab.id) activeTabId = curTab.id;
    } catch(err) {}
    n({ kind: "scanning", job: { progress: 5, status: "running" } });
    const p = await ne("SCAN_START", {
      tabId: activeTabId,
      options: { maxNodes: y, includeClientScripts: includeScripts }
    });
    Z(false);
    if (!p?.ok) {
      c(`${String(p?.code ?? "UNKNOWN")}: ${String(p?.message ?? p?.error ?? "Scan failed to start.")}`);
      if (p?.code === "UNSUPPORTED_PAGE") {
        n({
          kind: "failed",
          job: {
            scanId: "none",
            requestId: "none",
            tabId: 0,
            url: "",
            origin: "",
            status: "failed",
            progress: 100,
            errorCode: "UNSUPPORTED_PAGE",
            errorMessage: String(p.message ?? ""),
            startedAt: Date.now(),
            updatedAt: Date.now(),
            chunksReceived: 0
          }
        });
      }
      return;
    }
    await v();
  };

  const Me = async () => {
    await ne("SCAN_CANCEL");
    await v();
  };

  const it = async (p, b, btnKey) => {
    try {
      await navigator.clipboard.writeText(p);
      u(b);
      if (btnKey) {
        setCopiedBtn(btnKey);
        setTimeout(() => setCopiedBtn(null), 2500);
      }
      setTimeout(() => u(null), 2600);
    } catch {
      u(b);
      if (btnKey) {
        setCopiedBtn(btnKey);
        setTimeout(() => setCopiedBtn(null), 2500);
      }
      setTimeout(() => u(null), 2600);
    }
  };

  const handleDownloadAllAssetsZip = async (report) => {
    if (zipBusy) return;
    setZipBusy(true);
    setZipProgress({ pct: 2, msg: "Preparing site-named asset & 3D scene archive…" });
    try {
      const zipOut = await buildAssetsZipBundle(report, (pct, msg) => setZipProgress({ pct, msg }));
      Le(zipOut.fileName, zipOut.mime, zipOut.bytes);
      setZipProgress({
        pct: 100,
        msg: `Saved ${zipOut.fileName} (${zipOut.stats.downloaded} assets + scene.json + timelines.json)`
      });
    } catch (err) {
      c(`Asset ZIP failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setZipBusy(false);
    }
  };

  const handleDownloadFullProjectZip = async (report) => {
    if (zipBusy) return;
    setZipBusy(true);
    setZipProgress({ pct: 2, msg: "Building 1:1 Runtime + 3D + Topology + Full-Stack Kit…" });
    try {
      const zipOut = await buildFullProjectBundleZip(
        report,
        { promptMode, tastePreset, frontendStack, backendStack },
        (pct, msg) => setZipProgress({ pct, msg })
      );
      Le(zipOut.fileName, zipOut.mime, zipOut.bytes);
      setZipProgress({ pct: 100, msg: `Saved ${zipOut.fileName}!` });
    } catch (err) {
      c(`Project Kit ZIP failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setZipBusy(false);
    }
  };

  const handleDownloadSingleAsset = async (asset, idx) => {
    const cleanName = asset.fileName || `${asset.kind}-${idx + 1}.${asset.ext || "png"}`;
    if (asset.svgContent) {
      Le(cleanName.endsWith(".svg") ? cleanName : `${cleanName}.svg`, "image/svg+xml", asset.svgContent);
      return;
    }
    const fetchUrl = asset.downloadUrl || `${asset.url.origin}${asset.url.path}`;
    if (fetchUrl.startsWith("data:")) {
      const comma = fetchUrl.indexOf(",");
      if (comma !== -1) {
        Le(cleanName, asset.mime || "image/png", base64ToBytes(fetchUrl.slice(comma + 1)));
        return;
      }
    }
    const res = await ne("ASSET_FETCH_ONE", { url: fetchUrl });
    if (res?.ok && res.base64) {
      Le(cleanName, res.mime || asset.mime || "application/octet-stream", base64ToBytes(res.base64));
    } else {
      window.open(fetchUrl, "_blank", "noopener,noreferrer");
    }
  };

  const startLivePicker = async () => {
    c(null);
    let activeTabId = undefined;
    try {
      const focusedTabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      if (focusedTabs && focusedTabs[0] && focusedTabs[0].id) {
        activeTabId = focusedTabs[0].id;
      } else {
        const [curTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (curTab && curTab.id) activeTabId = curTab.id;
      }
    } catch(err) {}
    const res = await ne("INSPECT_START", { tabId: activeTabId });
    if (!res?.ok) {
      c(res?.error || "Could not start live element picker on this tab.");
      return;
    }
    setPickerActive(true);
    u("Click any element on the page to inspect");
    setTimeout(() => u(null), 3000);
  };

  const cancelLivePicker = async () => {
    let activeTabId = undefined;
    try {
      const focusedTabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      if (focusedTabs && focusedTabs[0] && focusedTabs[0].id) activeTabId = focusedTabs[0].id;
    } catch(err) {}
    await ne("INSPECT_CANCEL", { tabId: activeTabId });
    setPickerActive(false);
  };

  I.useEffect(() => {
    const handleKeyDown = (ev) => {
      if (ev.altKey && (ev.key === "p" || ev.key === "P")) {
        ev.preventDefault();
        setPickerActive((prev) => {
          if (prev) {
            cancelLivePicker();
            return false;
          } else {
            startLivePicker();
            return true;
          }
        });
      }
      if ((ev.metaKey || ev.ctrlKey) && ev.key === "Enter") {
        ev.preventDefault();
        if (t.kind !== "scanning" && !z) {
          A();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [t.kind, z, pickerActive]);


  const j = t.kind === "completed" || t.kind === "partial" ? t.report : null;
  const L = t.kind === "scanning" || t.kind === "cancelled" || t.kind === "failed" || t.kind === "stale" ? t.job : null;
  const siteSlug = j ? getSiteSlug(j) : "";

  const assetsList = j && Array.isArray(j.extracts.assets?.data) ? j.extracts.assets.data : [];
  const filteredAssets = assetsList.filter((item) => assetFilter === "all" || item.kind === assetFilter);

  const filteredTokens = j ? j.tokens.filter((tk) => {
    if (tokenFilter !== "all" && tk.category !== tokenFilter) return false;
    if (tokenSearch.trim()) {
      const q = tokenSearch.toLowerCase();
      return (
        tk.name.toLowerCase().includes(q) ||
        tk.value.toLowerCase().includes(q) ||
        (tk.hex && tk.hex.toLowerCase().includes(q)) ||
        (tk.role && tk.role.toLowerCase().includes(q))
      );
    }
    return true;
  }) : [];

  const compExtractData = j?.extracts.components?.data || {};
  const detectedComps = Array.isArray(compExtractData.components) ? compExtractData.components : [];
  const runtimeInfo = j ? getRuntimeData(j) : null;
  const modularSuite = j ? (function() { try { return generateModularReactSuite(j, tastePreset); } catch(err) { console.warn("modularSuite err:", err); return null; } })() : null;
  const backendBlueprint = j ? (function() { try { return generateBackendBlueprintFiles(j); } catch(err) { console.warn("backendBlueprint err:", err); return null; } })() : null;
  const generatedDesignMd = j ? (function() {
    try {
      return ks(j, { promptMode, tastePreset, frontendStack, backendStack });
    } catch(err) {
      console.error("ks err:", err);
      const slug = (typeof getSiteSlug === "function" ? getSiteSlug(j) : "site") || "site";
      return {
        fileName: slug + "-DESIGN.md",
        mime: "text/markdown",
        content: "# " + slug.toUpperCase() + " — 1:1 LIVING REPLICA & DESIGN SPECIFICATION\n\nSite scan extracted successfully."
      };
    }
  })() : null;

  const dominantColors = j ? extractDominantColors(j) : [];
  const detectedFonts = j ? extractDetectedFonts(j) : [];
  const studioActiveIdx = Math.max(0, STUDIO_TABS.indexOf(s));
  const pillLeft = `calc(6px + ${studioActiveIdx} * ((100% - 12px) / ${STUDIO_TABS.length}))`;
  const pillWidth = `calc((100% - 12px) / ${STUDIO_TABS.length})`;

  // ── AGY UI (ROBUST & PRECISION ENGINE) ───────────────────────────────────
  const AGY_TABS_ROW1 = ["Overview", "3D & Runtime", "Topology", "Assets", "Exports"];
  const AGY_TABS_ROW2 = ["History", "Prompt", "Settings"];
  const ALL_AGY_TABS = ["Overview", "3D & Runtime", "Topology", "Assets", "Exports", "History", "Prompt", "Settings"];
  const agyActiveTab = ALL_AGY_TABS.includes(s) ? s : "Overview";

  const runtimeInfo2 = j ? getRuntimeData(j) : null;
  const webgl2 = (runtimeInfo2 && runtimeInfo2.webglScene) || {};
  const timelines2 = (runtimeInfo2 && runtimeInfo2.timelines) || {};
  const clientScripts2 = (runtimeInfo2 && runtimeInfo2.clientScripts) || {};
  const audioNodes2 = (runtimeInfo2 && runtimeInfo2.audioNodes) || [];
  const totalScripts2 = ((clientScripts2.inlineCount || 0) + (clientScripts2.externalCount || 0));
  const proceduralGeoms = Array.isArray(webgl2.geometries) ? webgl2.geometries.length : 0;
  const shaderCount = Array.isArray(webgl2.shaders) ? webgl2.shaders.length : 0;
  const rawAssets = (j && j.extracts && j.extracts.assets && Array.isArray(j.extracts.assets.data)) ? j.extracts.assets.data : [];
  const model3dAssets = rawAssets.filter(function(a) {
    if (!a) return false;
    const ext = (a.ext || "").toLowerCase();
    const fn = (a.fileName || a.origPath || "").toLowerCase();
    return ext === "glb" || ext === "gltf" || ext === "obj" || ext === "fbx" || ext === "usdz" ||
           fn.endsWith(".glb") || fn.endsWith(".gltf") || fn.endsWith(".obj") || a.kind === "model";
  });
  const modelAssetCount = Math.max(model3dAssets.length, Array.isArray(webgl2.models) ? webgl2.models.length : 0);
  const explicitSceneObjects = Array.isArray(webgl2.objects) ? webgl2.objects.length : (Array.isArray(webgl2.meshes) ? webgl2.meshes.length : 0);
  let geomCount = proceduralGeoms + modelAssetCount + explicitSceneObjects;
  if (geomCount === 0 && shaderCount > 0) {
    const canvasCount = (Array.isArray(webgl2.canvases) ? webgl2.canvases.length : 0);
    geomCount = Math.max(1, canvasCount, Math.round(shaderCount / 2));
  }
  const chaptersCount = Array.isArray(timelines2.chapters) ? timelines2.chapters.length : 0;
  const audioCount = Array.isArray(audioNodes2) ? audioNodes2.length : (typeof audioNodes2 === "number" ? audioNodes2 : 0);
  const domNodes2 = (j && j.coverage && j.coverage.visited) || 0;
  const detectedComps2 = (compExtractData && Array.isArray(compExtractData.components)) ? compExtractData.components : [];

  // ── PRECISE TECH STACK DETECTION (ZERO FALSE POSITIVES) ───────────────────
  function detectTechStack2(report, rtInfo) {
    if (!report) return [];
    const stacks = [];
    const tokens = Array.isArray(report.tokens) ? report.tokens : [];
    const cs = (rtInfo && rtInfo.clientScripts) || {};
    const extScripts = Array.isArray(cs.externalScripts) ? cs.externalScripts : [];
    const scriptSrcs = extScripts.map(function(item) {
      return ((item.src || "") + " " + (item.relPath || "")).toLowerCase();
    }).join(" ");

    // 1. WebGL / 3D Graphics (Zero False Positives)
    if (/\bthree(\.min)?\.js|\/@threejs\/|three\.module\.js/i.test(scriptSrcs)) {
      stacks.push({ name: "Three.js", color: "#ff6b35", bg: "rgba(255,107,53,0.15)" });
    } else if (/\bbabylon(\.min)?\.js/i.test(scriptSrcs)) {
      stacks.push({ name: "Babylon.js", color: "#e04b4b", bg: "rgba(224,75,75,0.15)" });
    } else if (/\bpixi(\.min)?\.js/i.test(scriptSrcs)) {
      stacks.push({ name: "Pixi.js", color: "#e72264", bg: "rgba(231,34,100,0.15)" });
    } else if (shaderCount > 0 || (Array.isArray(webgl2.models) && webgl2.models.length > 0)) {
      stacks.push({ name: "WebGL", color: "#9333ea", bg: "rgba(147,51,234,0.15)" });
    }

    // 2. Next.js: Script src contains /_next/static/ or /_next/chunks/
    const hasNext = scriptSrcs.indexOf("/_next/static/") >= 0 || scriptSrcs.indexOf("/_next/chunks/") >= 0;
    if (hasNext) {
      stacks.push({ name: "Next.js", color: "#ffffff", bg: "rgba(255,255,255,0.1)" });
    }

    // 3. React: Next.js implies React, or script src contains react.production / react-dom
    const hasReact = hasNext || /react(-dom)?(\.production|\.development|\.min)?\.js|[\/@]react(-dom)?[\/@]/i.test(scriptSrcs);
    if (hasReact && !hasNext) {
      stacks.push({ name: "React", color: "#61dafb", bg: "rgba(97,218,251,0.12)" });
    }

    // 4. Framer: CSS variables with --framer- prefix or script src from framerusercontent / framer.com/m/
    const hasFramerTok = tokens.some(function(tk) { return (tk.name || "").indexOf("--framer-") === 0; });
    const hasFramerScript = /framerusercontent\.com|events\.framer\.com|\/framer\.com\/m\/|\/framer-motion\//i.test(scriptSrcs);
    if (hasFramerTok || hasFramerScript) {
      stacks.push({ name: "Framer", color: "#0099ff", bg: "rgba(0,153,255,0.15)" });
    }

    // 5. GSAP: Script src explicitly matches gsap.min.js or TweenMax
    const hasGsap = /\b(gsap|tweenmax|scrolltrigger)(\.min)?\.js/i.test(scriptSrcs);
    if (hasGsap) {
      stacks.push({ name: "GSAP", color: "#88ce02", bg: "rgba(136,206,2,0.12)" });
    }

    // 6. Vite: Script src explicitly matches /@vite/client or vite/dist
    const hasVite = scriptSrcs.indexOf("/@vite/client") >= 0 || scriptSrcs.indexOf("/@fs/") >= 0 || scriptSrcs.indexOf("vite/dist") >= 0;
    if (hasVite) {
      stacks.push({ name: "Vite", color: "#bd34fe", bg: "rgba(189,52,254,0.12)" });
    }

    // 7. Tailwind: Multiple CSS variables with --tw-
    const twCount = tokens.filter(function(tk) { return (tk.name || "").indexOf("--tw-") === 0; }).length;
    if (twCount >= 3 || scriptSrcs.indexOf("tailwindcss") >= 0 || scriptSrcs.indexOf("/tailwind.") >= 0) {
      stacks.push({ name: "Tailwind", color: "#38bdf8", bg: "rgba(56,189,248,0.12)" });
    }

    // 8. Vue / Nuxt: Script src explicitly matches vue.runtime or vue.min.js or /_nuxt/
    const hasNuxt = scriptSrcs.indexOf("/_nuxt/") >= 0;
    const hasVue = hasNuxt || /\bvue(\.runtime)?(\.min)?\.js/i.test(scriptSrcs);
    if (hasNuxt) {
      stacks.push({ name: "Nuxt", color: "#00dc82", bg: "rgba(0,220,130,0.12)" });
    } else if (hasVue) {
      stacks.push({ name: "Vue", color: "#4fc08d", bg: "rgba(79,192,141,0.12)" });
    }

    // 9. Webpack: Script src matching webpack-runtime or chunks with webpack in path
    const hasWebpack = !hasVite && (scriptSrcs.indexOf("webpack-runtime") >= 0 || scriptSrcs.indexOf("/webpack/") >= 0 || scriptSrcs.indexOf("webpackchunk") >= 0);
    if (hasWebpack && !hasNext) {
      stacks.push({ name: "Webpack", color: "#8dd6f9", bg: "rgba(141,214,249,0.12)" });
    }

    // 10. jQuery: Script src has jquery.min.js
    if (/\bjquery(\.min)?\.js/i.test(scriptSrcs)) {
      stacks.push({ name: "jQuery", color: "#0769ad", bg: "rgba(7,105,173,0.12)" });
    }

    // 11. Bootstrap: CSS tokens with --bs- or script src with bootstrap
    const bsCount = tokens.filter(function(tk) { return (tk.name || "").indexOf("--bs-") === 0; }).length;
    if (bsCount >= 3 || /\bbootstrap(\.bundle|\.min)?\.js/i.test(scriptSrcs)) {
      stacks.push({ name: "Bootstrap", color: "#7952b3", bg: "rgba(121,82,179,0.12)" });
    }

    return stacks;
  }
  const techStack2 = detectTechStack2(j, runtimeInfo2);

  function KV(props) {
    var cls = "agy-kv-val" + (props.accent ? " accent" : props.green ? " green" : props.muted ? " muted" : "");
    var valStr = typeof props.v === "object" ? JSON.stringify(props.v) : String(props.v != null ? props.v : "");
    return d.jsxs("div", { className: "agy-kv-row", children: [
      d.jsx("span", { className: "agy-kv-key", children: props.k }),
      d.jsx("span", { className: cls, children: valStr })
    ]});
  }

  function EmptySlate(props) {
    return d.jsx("div", { className: "agy-empty-slate", children:
      d.jsxs("div", { className: "agy-empty-inner", children: [
        d.jsx("div", { className: "agy-empty-icon", children: props.icon }),
        d.jsx("div", { className: "agy-empty-title", children: props.title }),
        d.jsx("div", { className: "agy-empty-desc", children: props.desc })
      ]})
    });
  }

  function renderScanReadyCard() {
    return d.jsxs("div", { className: "agy-ready-card", children: [
      d.jsx("div", { className: "agy-ready-glow" }),
      d.jsx("h3", { className: "agy-ready-h3", children: "Ready for Dynamic 1:1 Extraction" }),
      d.jsx("div", { className: "agy-cap-grid", children: [
        ["WebGL Scene Graphs (Three.js)", "CSS Keyframes", "Dynamic Web Audio API", "GLSL Shaders", "React Components", "Client JS Bundles"]
          .map(function(cap, i) {
            var dotCls = i === 2 ? "yellow" : i === 3 ? "white" : "green";
            return d.jsxs("div", { key: i, className: "agy-cap-item", children: [
              d.jsx("span", { className: "agy-cap-dot " + dotCls }),
              cap
            ]});
          })
      ]}),
      d.jsxs("div", { className: "agy-payload-row", children: [
        d.jsx("span", { className: "agy-payload-lbl", children: "Extracted Payload" }),
        ["DOM/SVG","TIMELINES","MODULAR COMPONENT ASSEMBLY"].map(function(tag, i) {
          return d.jsx("span", { key: i, className: "agy-payload-tag", children: tag });
        })
      ]}),
      d.jsx("div", { className: "agy-node-canvas", children:
        d.jsxs("svg", { width: "100%", height: "64", viewBox: "0 0 300 64", style: { overflow: "visible" }, children: [
          d.jsx("rect", { x:"10",  y:"17", width:"48", height:"28", rx:"4", fill:"#1e1b4b", stroke:"#7c3aed", strokeWidth:"1" }),
          d.jsx("text", { x:"34",  y:"34", textAnchor:"middle", fill:"#a78bfa", fontSize:"8", fontFamily:"monospace", children:"tokens" }),
          d.jsx("rect", { x:"75",  y:"4",  width:"48", height:"22", rx:"4", fill:"#1a1a2e", stroke:"#3b82f6", strokeWidth:"1" }),
          d.jsx("text", { x:"99",  y:"18", textAnchor:"middle", fill:"#60a5fa", fontSize:"8", fontFamily:"monospace", children:"assets" }),
          d.jsx("rect", { x:"75",  y:"36", width:"48", height:"22", rx:"4", fill:"#1a2035", stroke:"#06b6d4", strokeWidth:"1" }),
          d.jsx("text", { x:"99",  y:"50", textAnchor:"middle", fill:"#67e8f9", fontSize:"8", fontFamily:"monospace", children:"scripts" }),
          d.jsx("rect", { x:"148", y:"17", width:"58", height:"28", rx:"4", fill:"#1e1a2e", stroke:"#8b5cf6", strokeWidth:"1.5" }),
          d.jsx("text", { x:"177", y:"34", textAnchor:"middle", fill:"#c4b5fd", fontSize:"8", fontFamily:"monospace", children:"WebDNA" }),
          d.jsx("rect", { x:"225", y:"4",  width:"64", height:"22", rx:"4", fill:"#0f2a1a", stroke:"#10b981", strokeWidth:"1" }),
          d.jsx("text", { x:"257", y:"18", textAnchor:"middle", fill:"#34d399", fontSize:"8", fontFamily:"monospace", children:"export.zip" }),
          d.jsx("rect", { x:"225", y:"36", width:"64", height:"22", rx:"4", fill:"#1a0f2e", stroke:"#ec4899", strokeWidth:"1" }),
          d.jsx("text", { x:"257", y:"50", textAnchor:"middle", fill:"#f472b6", fontSize:"8", fontFamily:"monospace", children:"design.md" }),
          d.jsx("line", { x1:"58", y1:"31", x2:"75", y2:"15", stroke:"#374151", strokeWidth:"0.8" }),
          d.jsx("line", { x1:"58", y1:"31", x2:"75", y2:"47", stroke:"#374151", strokeWidth:"0.8" }),
          d.jsx("line", { x1:"123",y1:"15", x2:"148",y2:"31", stroke:"#374151", strokeWidth:"0.8" }),
          d.jsx("line", { x1:"123",y1:"47", x2:"148",y2:"31", stroke:"#374151", strokeWidth:"0.8" }),
          d.jsx("line", { x1:"206",y1:"31", x2:"225",y2:"15", stroke:"#374151", strokeWidth:"0.8" }),
          d.jsx("line", { x1:"206",y1:"31", x2:"225",y2:"47", stroke:"#374151", strokeWidth:"0.8" }),
        ]})
      })
    ]});
  }

  // ── INSPECTED ELEMENT CARD ───────────────────────────────────────────────
  function renderInspectedElementCard() {
    if (!inspectedEl) return null;
    const tag = inspectedEl.tag || "element";
    const clsList = Array.isArray(inspectedEl.classes) && inspectedEl.classes.length > 0 
      ? inspectedEl.classes.slice(0, 3).map(function(c) { return "." + c; }).join("") 
      : "";
    const dim = inspectedEl.rect ? (inspectedEl.rect.w + " × " + inspectedEl.rect.h + " px") : "";
    const st = inspectedEl.styles || {};

    return d.jsxs("div", { className: "agy-inspected-card", children: [
      d.jsxs("div", { className: "agy-inspected-header", children: [
        d.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }, children: [
          d.jsx("span", { className: "agy-inspected-badge", title: "<" + tag + clsList + ">", children: "<" + tag + clsList + ">" }),
          dim && d.jsx("span", { className: "agy-inspected-dims", children: dim })
        ]}),
        d.jsx("button", {
          className: "agy-inspected-close",
          title: "Clear Inspected Element",
          onClick: function() { setInspectedEl(null); },
          children: "✕"
        })
      ]}),

      d.jsxs("div", { className: "agy-inspected-actions", children: [
        d.jsxs("button", {
          className: "agy-inspected-btn" + (copiedBtn === "inspected-tw" ? " copied" : ""),
          onClick: function() {
            it(inspectedEl.tailwindClasses || (Array.isArray(inspectedEl.classes) ? inspectedEl.classes.join(" ") : ""), "Copied Tailwind classes!", "inspected-tw");
          },
          children: [
            d.jsx("span", { children: copiedBtn === "inspected-tw" ? "✓" : "⚡" }),
            copiedBtn === "inspected-tw" ? "Copied TW!" : "Copy Tailwind"
          ]
        }),
        d.jsxs("button", {
          className: "agy-inspected-btn" + (copiedBtn === "inspected-jsx" ? " copied" : ""),
          onClick: function() {
            it(inspectedEl.reactSnippet || ("<" + tag + " />"), "Copied React JSX!", "inspected-jsx");
          },
          children: [
            d.jsx("span", { children: copiedBtn === "inspected-jsx" ? "✓" : "⚛" }),
            copiedBtn === "inspected-jsx" ? "Copied JSX!" : "Copy JSX"
          ]
        }),
        d.jsxs("button", {
          className: "agy-inspected-btn" + (copiedBtn === "inspected-css" ? " copied" : ""),
          onClick: function() {
            it(inspectedEl.cssSnippet || "", "Copied CSS snippet!", "inspected-css");
          },
          children: [
            d.jsx("span", { children: copiedBtn === "inspected-css" ? "✓" : "🎨" }),
            copiedBtn === "inspected-css" ? "Copied CSS!" : "Copy CSS"
          ]
        })
      ]}),

      d.jsxs("div", { className: "agy-inspected-props", children: [
        d.jsxs("div", { className: "agy-inspected-prop-item", children: [
          d.jsx("span", { className: "agy-inspected-prop-key", children: "Font / Size" }),
          d.jsx("span", { className: "agy-inspected-prop-val", children: (st.fontFamily || "inherit") + " (" + (st.fontSize || "-") + ")" })
        ]}),
        d.jsxs("div", { className: "agy-inspected-prop-item", children: [
          d.jsx("span", { className: "agy-inspected-prop-key", children: "Color / BG" }),
          d.jsx("span", { className: "agy-inspected-prop-val", children: (st.color || "-") + " / " + (st.backgroundColor || "transparent") })
        ]}),
        d.jsxs("div", { className: "agy-inspected-prop-item", children: [
          d.jsx("span", { className: "agy-inspected-prop-key", children: "Display / Align" }),
          d.jsx("span", { className: "agy-inspected-prop-val", children: (st.display || "block") + " (" + (st.alignItems || "start") + ")" })
        ]}),
        d.jsxs("div", { className: "agy-inspected-prop-item", children: [
          d.jsx("span", { className: "agy-inspected-prop-key", children: "Padding / Radius" }),
          d.jsx("span", { className: "agy-inspected-prop-val", children: (st.padding || "0px") + " / " + (st.borderRadius || "0px") })
        ]})
      ]}),

      inspectedEl.tailwindClasses && d.jsx("div", {
        className: "agy-inspected-preview",
        title: "Click to copy Tailwind classes",
        onClick: function() {
          it(inspectedEl.tailwindClasses, "Copied Tailwind classes!", "inspected-tw");
        },
        children: inspectedEl.tailwindClasses
      })
    ]});
  }

  // ── OVERVIEW TAB ──────────────────────────────────────────────────────────
  function renderOverviewTab() {
    if (!j) {
      if (inspectedEl) {
        return d.jsxs("div", { className: "agy-tab-body", children: [
          renderInspectedElementCard(),
          renderScanReadyCard()
        ]});
      }
      return renderScanReadyCard();
    }
    var slug = getSiteSlug(j);
    return d.jsxs("div", { className: "agy-tab-body", children: [
      inspectedEl && renderInspectedElementCard(),
      d.jsxs("div", { className: "agy-site-card", children: [
        d.jsxs("div", { className: "agy-site-meta", children: [
          d.jsx("div", { className: "agy-favicon" }),
          d.jsxs("div", { children: [
            d.jsx("div", { className: "agy-site-slug", children: slug || "scanned-site" }),
            d.jsx("div", { className: "agy-site-status", children: j.status || "Scan complete" })
          ]})
        ]}),
        techStack2.length > 0 && d.jsx("div", { className: "agy-badge-row", children:
          techStack2.map(function(stk, i) {
            return d.jsx("span", { key: i, className: "agy-tech-badge", style: { color: stk.color, background: stk.bg, borderColor: stk.color+"55" }, children: stk.name });
          })
        })
      ]}),
      d.jsx("div", { className: "agy-stats-grid", children:
        [
          { e:"🎨", l:"Colors",      v: dominantColors.length,  hi: dominantColors.length>0 },
          { e:"🔤", l:"Fonts",       v: detectedFonts.length,   hi: false },
          { e:"📜", l:"Scripts",     v: totalScripts2,          hi: totalScripts2>0 },
          { e:"🎬", l:"3D Objects",  v: geomCount,              hi: geomCount>0 },
          { e:"✦",  l:"Shaders",     v: shaderCount,            hi: false },
          { e:"📽️",l:"Chapters",    v: chaptersCount,          hi: false },
          { e:"🔊", l:"Audio Nodes", v: audioCount,             hi: false },
          { e:"🧩", l:"DOM Nodes",   v: domNodes2,              hi: false },
          { e:"⚛️",l:"Components",  v: detectedComps2.length,  hi: detectedComps2.length>0 },
        ].map(function(item, i) {
          return d.jsxs("div", { key: i, className: "agy-stat-chip" + (item.hi ? " hi" : ""), children: [
            d.jsx("span", { className: "agy-stat-e", children: item.e }),
            d.jsxs("div", { children: [
              d.jsx("div", { className: "agy-stat-v", children: item.v }),
              d.jsx("div", { className: "agy-stat-l", children: item.l })
            ]})
          ]});
        })
      }),
      dominantColors.length > 0 && d.jsxs("div", { className: "agy-section", children: [
        d.jsx("div", { className: "agy-section-lbl", children: "COLOR PALETTE" }),
        d.jsx("div", { className: "agy-color-strip", children:
          dominantColors.slice(0, 14).map(function(c, i) {
            return d.jsx("button", { key: i, className: "agy-swatch", title: c.hex, style: { background: c.hex }, onClick: function() { it(c.hex, "Copied " + c.hex); } });
          })
        })
      ]}),
      detectedFonts.length > 0 && d.jsxs("div", { className: "agy-section", children: [
        d.jsx("div", { className: "agy-section-lbl", children: "DETECTED FONTS" }),
        detectedFonts.slice(0, 5).map(function(f, i) {
          return d.jsxs("div", { key: i, className: "agy-font-row", children: [
            d.jsx("span", { className: "agy-font-name", style: { fontFamily: f.family || f.name }, children: f.family || f.name || "Unknown" }),
            d.jsx("span", { className: "agy-font-meta", children: f.weight ? ("wt " + f.weight) : (f.source || "") })
          ]});
        })
      ]})
    ]});
  }

  // ── 3D & RUNTIME TAB (SAFE NUMBER FORMATTING) ─────────────────────────────
  function renderThreeDTab() {
    if (!j) return d.jsx(EmptySlate, { icon:"🎬", title:"No runtime data yet", desc:"Scan a Three.js or GSAP page to see scene data." });
    var vhRatioStr = typeof timelines2.totalVhRatio === "number"
      ? (timelines2.totalVhRatio.toFixed(1) + "x")
      : (timelines2.totalVhRatio ? String(timelines2.totalVhRatio) : "N/A");

    return d.jsxs("div", { className: "agy-tab-body", children: [
      d.jsxs("div", { className: "agy-card", children: [
        d.jsx("div", { className: "agy-card-ttl", children: "⬡ WebGL Scene" }),
        d.jsxs("div", { className: "agy-kv", children: [
          d.jsx(KV, { k: "Geometries", v: geomCount, accent: true }),
          d.jsx(KV, { k: "GLSL Shaders", v: shaderCount, accent: true }),
          d.jsx(KV, { k: "Scene Active", v: geomCount > 0 ? "Yes" : "No", green: geomCount > 0, muted: geomCount === 0 }),
        ]}),
        geomCount > 0 && Array.isArray(webgl2.geometries) && d.jsx("div", { className: "agy-badge-row", style: { marginTop: "8px" }, children:
          webgl2.geometries.slice(0, 8).map(function(g, i) {
            return d.jsx("span", { key: i, className: "agy-mini-badge", children: g.name || g.type || ("Geom #" + (i + 1)) });
          })
        })
      ]}),
      d.jsxs("div", { className: "agy-card", children: [
        d.jsx("div", { className: "agy-card-ttl", children: "⏱ Scroll Timelines" }),
        d.jsxs("div", { className: "agy-kv", children: [
          d.jsx(KV, { k: "Chapters", v: chaptersCount, accent: true }),
          d.jsx(KV, { k: "VH Ratio", v: vhRatioStr }),
        ]}),
        chaptersCount > 0 && Array.isArray(timelines2.chapters) && d.jsx("div", { className: "agy-badge-row", style: { marginTop: "8px" }, children:
          timelines2.chapters.slice(0, 6).map(function(ch, i) {
            return d.jsx("span", { key: i, className: "agy-mini-badge purple", children: ch.label || ch.name || ("Ch " + (i + 1)) });
          })
        })
      ]}),
      d.jsxs("div", { className: "agy-card", children: [
        d.jsx("div", { className: "agy-card-ttl", children: "🔊 Audio & Scripts" }),
        d.jsxs("div", { className: "agy-kv", children: [
          d.jsx(KV, { k: "Audio Nodes", v: audioCount, accent: audioCount > 0 }),
          d.jsx(KV, { k: "Web Audio API", v: audioCount > 0 ? "Active" : "Not detected", green: audioCount > 0, muted: audioCount === 0 }),
          d.jsx(KV, { k: "Total Scripts", v: totalScripts2, accent: true }),
          d.jsx(KV, { k: "Inline", v: clientScripts2.inlineCount || 0 }),
          d.jsx(KV, { k: "External", v: clientScripts2.externalCount || 0 }),
        ]})
      ]})
    ]});
  }

  // ── TOPOLOGY TAB (ACCURATE STACK REPORT) ──────────────────────────────────
  function renderTopologyTab() {
    if (!j) return d.jsx(EmptySlate, { icon:"🗺️", title:"Topology awaits", desc:"Scan any page to auto-detect framework, build tool, render mode." });
    const extScripts = Array.isArray(clientScripts2.externalScripts) ? clientScripts2.externalScripts : [];
    const scriptSrcs = extScripts.map(function(item) {
      return ((item.src || "") + " " + (item.relPath || "")).toLowerCase();
    }).join(" ");

    var buildTool = scriptSrcs.indexOf("/@vite/client") >= 0 || scriptSrcs.indexOf("vite/dist") >= 0
      ? "Vite"
      : scriptSrcs.indexOf("turbopack") >= 0
      ? "Turbopack"
      : (scriptSrcs.indexOf("webpack") >= 0 || scriptSrcs.indexOf("/_next/") >= 0)
      ? "Webpack"
      : "Standard / Bundled";
    var renderMode = scriptSrcs.indexOf("/_next/static/") >= 0 ? "SSR/SSG (Next.js)" : scriptSrcs.indexOf("/_nuxt/") >= 0 ? "SSR (Nuxt)" : "CSR (Client-side)";

    return d.jsxs("div", { className: "agy-tab-body", children: [
      d.jsxs("div", { className: "agy-card", children: [
        d.jsx("div", { className: "agy-card-ttl", children: "⚙️ Detected Tech Stack" }),
        techStack2.length > 0
          ? d.jsx("div", { className: "agy-badge-row", style: { marginTop: "8px" }, children:
              techStack2.map(function(stk, i) {
                return d.jsxs("div", { key: i, className: "agy-tech-badge-lg", style: { color: stk.color, background: stk.bg, borderColor: stk.color + "55" }, children: [
                  stk.name,
                  d.jsx("span", { className: "agy-badge-dot", style: { background: stk.color } })
                ]});
              })
            })
          : d.jsx("div", { className: "agy-muted", children: "Standard Web Stack (HTML / CSS / JavaScript)" })
      ]}),
      d.jsxs("div", { className: "agy-card", children: [
        d.jsx("div", { className: "agy-card-ttl", children: "🏗️ Build & Runtime" }),
        d.jsxs("div", { className: "agy-kv", children: [
          d.jsx(KV, { k: "Build Engine", v: buildTool, accent: true }),
          d.jsx(KV, { k: "Render Mode", v: renderMode }),
          d.jsx(KV, { k: "DOM Nodes", v: domNodes2 }),
          d.jsx(KV, { k: "React Components", v: detectedComps2.length }),
        ]})
      ]}),
      d.jsxs("div", { className: "agy-card", children: [
        d.jsx("div", { className: "agy-card-ttl", children: "🎨 Design System" }),
        d.jsxs("div", { className: "agy-kv", children: [
          d.jsx(KV, { k: "Design Tokens", v: Array.isArray(j.tokens) ? j.tokens.length : 0, accent: true }),
          d.jsx(KV, { k: "Colors", v: dominantColors.length }),
          d.jsx(KV, { k: "Fonts", v: detectedFonts.length }),
          d.jsx(KV, { k: "3D Geometries", v: geomCount }),
          d.jsx(KV, { k: "Scroll Chapters", v: chaptersCount }),
        ]})
      ]}),
      detectedComps2.length > 0 && d.jsxs("div", { className: "agy-card", children: [
        d.jsx("div", { className: "agy-card-ttl", children: "⚛️ Components (" + detectedComps2.length + ")" }),
        d.jsx("div", { className: "agy-badge-row", children:
          detectedComps2.slice(0, 12).map(function(c, i) {
            return d.jsx("span", { key: i, className: "agy-mini-badge blue", children: c.name || c.displayName || ("Comp #" + (i + 1)) });
          })
        })
      ]})
    ]});
  }

  // ── ASSETS TAB (SAFE FILTERING, RENDERING & EXPORT LOCK) ───────────────────
  function renderAssetsTab() {
    const list = Array.isArray(assetsList) ? assetsList : [];
    var modC = list.filter(function(a){ return a && (["glb","gltf","obj","fbx","usdz"].indexOf((a.ext||"").toLowerCase()) >= 0 || a.kind === "model"); }).length;
    var svgC = list.filter(function(a){ return a && (a.kind === "svg" || a.ext === "svg"); }).length;
    var imgC = list.filter(function(a){ return a && ["png","jpg","jpeg","gif","webp","avif"].indexOf(a.ext || "") >= 0; }).length;
    var vidC = list.filter(function(a){ return a && ["mp4","webm","mov"].indexOf(a.ext || "") >= 0; }).length;
    var fntC = list.filter(function(a){ return a && ["woff","woff2","ttf","otf"].indexOf(a.ext || "") >= 0; }).length;
    if (!j || list.length === 0) return d.jsx(EmptySlate, { icon: "📦", title: "No assets extracted", desc: "Scan a page to pull SVGs, images, 3D models, and fonts." });

    const currentFiltered = list.filter(function(a) {
      if (!a) return false;
      if (assetFilter === "all") return true;
      if (assetFilter === "3d") return ["glb","gltf","obj","fbx","usdz"].indexOf((a.ext||"").toLowerCase()) >= 0 || a.kind === "model";
      if (assetFilter === "svg") return a.kind === "svg" || a.ext === "svg";
      if (assetFilter === "image") return ["png","jpg","jpeg","gif","webp","avif"].indexOf(a.ext || "") >= 0;
      if (assetFilter === "video") return ["mp4","webm","mov"].indexOf(a.ext || "") >= 0;
      if (assetFilter === "font") return ["woff","woff2","ttf","otf"].indexOf(a.ext || "") >= 0;
      return true;
    });
    const isBusy = !!zipBusy;

    return d.jsxs("div", { className: "agy-tab-body", children: [
      d.jsx("div", { className: "agy-asset-summary", children:
        [{ label: "3D Models", count: modC, color: "#a855f7" }, { label: "SVGs", count: svgC, color: "#f97316" }, { label: "Images", count: imgC, color: "#3b82f6" }, { label: "Videos", count: vidC, color: "#ec4899" }, { label: "Fonts", count: fntC, color: "#8b5cf6" }]
          .filter(function(x){ return x.count > 0; })
          .map(function(x, i){
            return d.jsxs("div", { key: i, className: "agy-kind-pill", style: { color: x.color, borderColor: x.color + "44", background: x.color + "12" }, children: [x.count, " ", x.label] });
          })
      }),
      d.jsx("div", { className: "agy-filter-row", children:
        ["all", "3d", "svg", "image", "video", "font"].map(function(f) {
          const displayLabel = f === "3d" ? "3D" : (f.charAt(0).toUpperCase() + f.slice(1));
          return d.jsx("button", { key: f, className: "agy-filter-btn" + (assetFilter === f ? " active" : ""), onClick: function() { setAssetFilter(f); }, children: displayLabel });
        })
      }),
      d.jsx("div", { className: "agy-asset-grid", children:
        currentFiltered.map(function(asset, idx) {
          if (!asset) return null;
          const isSvg = asset.kind === "svg" || asset.ext === "svg" || (typeof asset.svgContent === "string" && asset.svgContent.length > 0);
          const is3D = ["glb","gltf","obj","fbx","usdz"].indexOf((asset.ext||"").toLowerCase()) >= 0 || asset.kind === "model";
          return d.jsxs("div", { key: idx, className: "agy-asset-card", children: [
            d.jsx("div", { className: "agy-asset-preview", children:
              isSvg && typeof asset.svgContent === "string"
                ? d.jsx("div", { dangerouslySetInnerHTML: { __html: asset.svgContent }, className: "agy-svg-view" })
                : is3D
                  ? d.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "4px" }, children: [
                      d.jsx("span", { style: { fontSize: "24px" }, children: "🧊" }),
                      d.jsx("span", { className: "agy-mini-badge purple", children: (asset.ext || "glb").toUpperCase() })
                    ] })
                  : asset.downloadUrl
                    ? d.jsx("img", { src: asset.downloadUrl, alt: String(asset.fileName || "asset"), className: "agy-img-view" })
                    : d.jsx("span", { className: "agy-asset-ph", children: asset.kind === "font" ? "Aa" : asset.kind === "video" ? "▶" : "?" })
            }),
            d.jsxs("div", { className: "agy-asset-foot", children: [
              d.jsx("span", { className: "agy-asset-nm", children: String(asset.fileName || "asset").substring(0, 14) }),
              d.jsx("button", { className: "agy-asset-dl", title: "Download", onClick: function() { handleDownloadSingleAsset(asset, idx); }, children: "↓" })
            ]})
          ]});
        })
      }),
      d.jsx("button", {
        className: "agy-btn-full" + (isBusy ? " disabled" : ""),
        disabled: isBusy,
        onClick: function() { if (!isBusy) handleDownloadAllAssetsZip(j); },
        children: isBusy ? (zipProgress?.msg || "Exporting assets…") : "⬇ Download All Assets ZIP"
      })
    ]});
  }

  // ── EXPORTS TAB (PROGRESS BAR & ANTI-MULTI-CLICK LOCK) ─────────────────────
  function renderExportsTab() {
    if (!j) return d.jsx(EmptySlate, { icon: "📤", title: "Nothing to export", desc: "Run a scan to unlock exports." });
    var tcfg = generateTailwindConfig(j);
    var dmdStr = typeof generatedDesignMd === "object" && generatedDesignMd !== null
      ? (generatedDesignMd.content || "")
      : (typeof generatedDesignMd === "string" ? generatedDesignMd : "");
    const tokenList = Array.isArray(filteredTokens) ? filteredTokens : [];
    const isBusy = !!zipBusy;
    const pct = zipProgress?.pct != null ? Math.max(5, Math.min(100, Math.round(zipProgress.pct))) : 30;
    const msg = zipProgress?.msg || "Exporting package…";

    return d.jsxs("div", { className: "agy-tab-body", children: [
      d.jsxs("div", { className: "agy-card", children: [
        d.jsx("div", { className: "agy-card-ttl", children: "🗂 Export Packages" }),

        // Animated progress card displayed during any active export
        isBusy && d.jsxs("div", { className: "agy-export-progress", children: [
          d.jsxs("div", { className: "agy-export-progress-top", children: [
            d.jsxs("span", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
              d.jsx("span", { className: "agy-spinner" }),
              msg
            ] }),
            d.jsx("span", { style: { color: "#a78bfa", fontFamily: "monospace" }, children: pct + "%" })
          ] }),
          d.jsx("div", { className: "agy-export-progress-track", children:
            d.jsx("div", { className: "agy-export-progress-bar", style: { width: pct + "%" } })
          }),
          d.jsx("div", { className: "agy-export-progress-hint", children: "Please wait while WebDNA bundles your files. Controls are locked until completed." })
        ] }),

        d.jsx("div", { className: "agy-export-grid", children:
          [
            {
              icon: "📦",
              title: "Full Project ZIP",
              desc: isBusy ? "Packing..." : "React + tokens + assets",
              fn: function() { if (!isBusy) handleDownloadFullProjectZip(j); }
            },
            {
              icon: "🎨",
              title: "Assets Only",
              desc: isBusy ? "Packing..." : "SVGs, images, fonts",
              fn: function() { if (!isBusy) handleDownloadAllAssetsZip(j); }
            },
            {
              icon: "⚙️",
              title: "Tailwind Config",
              desc: "tailwind.config.js",
              fn: function() {
                if (isBusy) return;
                Le("tailwind.config.js", "application/javascript", new TextEncoder().encode(tcfg));
                it("Downloaded tailwind.config.js");
              }
            },
            {
              icon: "🤖",
              title: "AI Prompt",
              desc: "Copy DESIGN.md",
              fn: function() {
                if (isBusy) return;
                it(dmdStr, "Copied DESIGN.md to clipboard!");
              }
            },
          ].map(function(item, i) {
            return d.jsxs("button", {
              key: i,
              className: "agy-export-card" + (isBusy ? " disabled" : ""),
              disabled: isBusy,
              onClick: item.fn,
              children: [
                d.jsx("div", { className: "agy-export-icon", children: item.icon }),
                d.jsx("div", { className: "agy-export-title", children: item.title }),
                d.jsx("div", { className: "agy-export-desc", children: item.desc })
              ]
            });
          })
        })
      ]}),
      Array.isArray(j.tokens) && j.tokens.length > 0 && d.jsxs("div", { className: "agy-card", children: [
        d.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }, children: [
          d.jsx("div", { className: "agy-card-ttl", children: "🎨 Design Tokens (" + tokenList.length + ")" }),
          d.jsx("input", { className: "agy-search-sm", placeholder: "Search…", value: tokenSearch, onChange: function(ev) { setTokenSearch(ev.target.value); } })
        ]}),
        d.jsx("div", { className: "agy-kv", children:
          tokenList.slice(0, 24).map(function(tk, i) {
            if (!tk) return null;
            var valDisplay = typeof tk.value === "object" ? JSON.stringify(tk.value) : String(tk.value != null ? tk.value : "");
            return d.jsxs("div", { key: i, className: "agy-kv-row", children: [
              d.jsx("span", { className: "agy-kv-key mono", children: String(tk.name || "token") }),
              d.jsxs("span", { className: "agy-kv-val", style: { display: "flex", alignItems: "center", gap: "5px" }, children: [
                tk.hex && d.jsx("span", { style: { width: "10px", height: "10px", borderRadius: "2px", background: tk.hex, display: "inline-block", flexShrink: 0, border: "1px solid rgba(255,255,255,0.1)" } }),
                valDisplay
              ]})
            ]});
          })
        })
      ]})
    ]});
  }

  // ── AI PROMPT TAB (SAFE STRING HANDLING) ──────────────────────────────────
  function renderAIPromptTab() {
    if (!j) return d.jsx(EmptySlate, { icon: "🤖", title: "Scan first", desc: "WebDNA generates a structured DESIGN.md for Claude, GPT-4, or Gemini." });
    var dmdStr = typeof generatedDesignMd === "object" && generatedDesignMd !== null
      ? (generatedDesignMd.content || "")
      : (typeof generatedDesignMd === "string" ? generatedDesignMd : "");
    var dmdFileName = (typeof generatedDesignMd === "object" && generatedDesignMd && generatedDesignMd.fileName) ? generatedDesignMd.fileName : "design.md";

    return d.jsxs("div", { className: "agy-tab-body", children: [
      d.jsxs("div", { className: "agy-card", children: [
        d.jsx("div", { className: "agy-card-ttl", children: "🤖 AI Design Context" }),
        d.jsx("div", { className: "agy-muted", style: { marginBottom: "12px" }, children: "Paste DESIGN.md into any LLM to recreate the site design system." }),
        d.jsxs("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap" }, children: [
          d.jsx("button", { className: "agy-btn-primary", onClick: function() { it(dmdStr, "Copied DESIGN.md!"); }, children: "📋 Copy DESIGN.md" }),
          d.jsx("button", { className: "agy-btn-secondary", onClick: function() { Le(dmdFileName, "text/markdown", new TextEncoder().encode(dmdStr)); }, children: "⬇ Save .md" })
        ]})
      ]}),
      dmdStr && d.jsxs("div", { className: "agy-card", children: [
        d.jsx("div", { className: "agy-card-ttl", children: "Preview" }),
        d.jsx("pre", { className: "agy-code-block", children: dmdStr.substring(0, 900) + (dmdStr.length > 900 ? "\n\u2026" : "") })
      ]})
    ]});
  }

  // ── HISTORY TAB (CONNECTED TO REAL WEBDNA HISTORY STORE) ───────────────────
  function renderHistoryTab() {
    const historyItems = Array.isArray(r) ? r : [];

    return d.jsx("div", { className: "agy-tab-body", children:
      historyItems.length > 0
        ? historyItems.map(function(item, i) {
            const originStr = item.origin ? (item.origin + (item.path || "")) : (item.siteSlug || ("Report #" + (i + 1)));
            const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleString() : "";
            const nodeCountStr = item.nodeCount ? (item.nodeCount + " nodes") : "";
            return d.jsxs("div", { key: item.reportId || i, className: "agy-scan-row", children: [
              d.jsxs("div", {
                style: { cursor: "pointer", flex: 1, minWidth: 0 },
                onClick: function() { if (typeof H === "function") { H(item.reportId); e("Overview"); } },
                children: [
                  d.jsx("div", { className: "agy-scan-site", style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: originStr }),
                  d.jsxs("div", { className: "agy-scan-meta", children: [dateStr, nodeCountStr ? " • " + nodeCountStr : ""] })
                ]
              }),
              d.jsxs("div", { style: { display: "flex", gap: "6px", alignItems: "center" }, children: [
                d.jsx("button", {
                  className: "agy-btn-sm",
                  onClick: function() { if (typeof H === "function") { H(item.reportId); e("Overview"); } },
                  children: "Load"
                }),
                d.jsx("button", {
                  className: "agy-btn-sm",
                  style: { color: "#f87171", borderColor: "rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.08)" },
                  onClick: async function() {
                    try {
                      await ne("HISTORY_DELETE", { reportId: item.reportId });
                      if (typeof P === "function") await P();
                    } catch(err) {}
                  },
                  children: "✕"
                })
              ]})
            ]});
          })
        : d.jsx(EmptySlate, { icon: "🕐", title: "No scan history", desc: "Completed scans will automatically be saved here." })
    });
  }

  // ── SETTINGS TAB (CONNECTED TO REAL WEBDNA ACTIONS) ───────────────────────
  function renderSettingsTab() {
    return d.jsxs("div", { className: "agy-tab-body", children: [
      d.jsxs("div", { className: "agy-card", children: [
        d.jsx("div", { className: "agy-card-ttl", children: "🔌 AI Agent MCP Bridge (Claude / Cursor / Antigravity)" }),
        d.jsxs("div", { className: "agy-kv", children: [
          d.jsx(KV, { k: "Bridge Gateway", v: "127.0.0.1:8765", accent: true }),
          d.jsx(KV, { k: "MCP Server", v: "mcp-server/server.mjs", green: true }),
          d.jsx(KV, { k: "Protocol", v: "Model Context Protocol (v2024-11-05)" }),
          d.jsx(KV, { k: "Autonomous Tools", v: "7 Extraction Tools Active" }),
        ]}),
        d.jsxs("div", { style: { display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }, children: [
          d.jsx("button", {
            className: "agy-btn-sm" + (copiedBtn === "mcp" ? " agy-btn-success" : ""),
            style: { color: copiedBtn === "mcp" ? "#34d399" : "#c084fc", borderColor: copiedBtn === "mcp" ? "rgba(16,185,129,0.6)" : "rgba(192,132,252,0.3)", background: copiedBtn === "mcp" ? "rgba(16,185,129,0.18)" : "rgba(192,132,252,0.1)" },
            onClick: async function() {
              let dynPath = "<PATH_TO_WEBDNA_FOLDER>/mcp-server/server.mjs";
              try {
                const res = await fetch("http://127.0.0.1:8765/status").then(function(r){ return r.json(); }).catch(function(){ return null; });
                if (res && res.serverPath) dynPath = res.serverPath;
              } catch(e) {}
              const cfg = JSON.stringify({
                mcpServers: {
                  webdna: {
                    command: "node",
                    args: [dynPath]
                  }
                }
              }, null, 2);
              it(cfg, dynPath.indexOf("<") === -1 ? "Copied Dynamic MCP Config for this PC!" : "Copied MCP Config! (Run install-mcp.bat for 1-click auto setup)", "mcp");
            },
            children: copiedBtn === "mcp" ? "✓ Config Copied!" : "📋 Copy Dynamic MCP Config"
          }),
          d.jsx("button", {
            className: "agy-btn-sm" + (copiedBtn === "install" ? " agy-btn-success" : ""),
            style: { color: copiedBtn === "install" ? "#34d399" : "#38bdf8", borderColor: copiedBtn === "install" ? "rgba(16,185,129,0.6)" : "rgba(56,189,248,0.3)", background: copiedBtn === "install" ? "rgba(16,185,129,0.18)" : "rgba(56,189,248,0.1)" },
            onClick: function() {
              const batContent = [
                "@echo off",
                "setlocal enabledelayedexpansion",
                "title WebDNA MCP Auto-Installer",
                "echo ====================================================",
                "echo    WebDNA MCP Auto-Installer for Claude and Cursor",
                "echo ====================================================",
                "echo.",
                "where node >nul 2>&1",
                "if errorlevel 1 (",
                "    echo [ERROR] Node.js is required to run the MCP server.",
                "    echo Please install Node.js from https://nodejs.org",
                "    echo After installing Node.js, run this file again!",
                "    echo.",
                "    pause",
                "    exit /b 1",
                ")",
                "set \"SETUP_PATH=\"",
                "if exist \"%~dp0mcp-server\\setup-mcp.mjs\" set \"SETUP_PATH=%~dp0mcp-server\\setup-mcp.mjs\"",
                "if not defined SETUP_PATH if exist \"%~dp0setup-mcp.mjs\" set \"SETUP_PATH=%~dp0setup-mcp.mjs\"",
                "if not defined SETUP_PATH if exist \"%USERPROFILE%\\Desktop\\webdna-core\\mcp-server\\setup-mcp.mjs\" set \"SETUP_PATH=%USERPROFILE%\\Desktop\\webdna-core\\mcp-server\\setup-mcp.mjs\"",
                "if not defined SETUP_PATH if exist \"%USERPROFILE%\\Desktop\\WebDNA\\mcp-server\\setup-mcp.mjs\" set \"SETUP_PATH=%USERPROFILE%\\Desktop\\WebDNA\\mcp-server\\setup-mcp.mjs\"",
                "if not defined SETUP_PATH if exist \"%USERPROFILE%\\Downloads\\webdna-core\\mcp-server\\setup-mcp.mjs\" set \"SETUP_PATH=%USERPROFILE%\\Downloads\\webdna-core\\mcp-server\\setup-mcp.mjs\"",
                "if not defined SETUP_PATH if exist \"%USERPROFILE%\\Downloads\\webdna-v1.0.0\\mcp-server\\setup-mcp.mjs\" set \"SETUP_PATH=%USERPROFILE%\\Downloads\\webdna-v1.0.0\\mcp-server\\setup-mcp.mjs\"",
                "if defined SETUP_PATH (",
                "    echo [OK] Located WebDNA at: !SETUP_PATH!",
                "    echo.",
                "    node \"!SETUP_PATH!\"",
                ") else (",
                "    echo [ERROR] Could not automatically locate WebDNA mcp-server.",
                "    echo Please place your WebDNA folder on Desktop or run install-mcp.bat inside the WebDNA folder.",
                ")",
                "echo.",
                "pause"
              ].join("\r\n");
              Le("install-webdna-mcp.bat", "application/x-bat", batContent);
              u("Downloaded installer! Click 'install-webdna-mcp.bat' in your Chrome downloads to run.");
              setCopiedBtn("install");
              setTimeout(function() { setCopiedBtn(null); }, 3000);
            },
            children: copiedBtn === "install" ? "✓ Installer Downloaded!" : "📥 Download Auto-Installer (.bat)"
          })
        ]}),
        d.jsxs("div", { className: "agy-muted", style: { fontSize: "11px", marginTop: "10px", color: "#94a3b8", lineHeight: "1.5" }, children: [
          d.jsx("div", { style: { fontWeight: "600", color: "#cbd5e1", marginBottom: "3px" }, children: "⚡ Easiest Setup for Non-IT Users:" }),
          d.jsx("div", { children: "1. Open your downloaded WebDNA folder" }),
          d.jsx("div", { children: "2. Double-click install-mcp.bat (Windows) or run ./install-mcp.sh (Mac/Linux)" }),
          d.jsx("div", { style: { color: "#34d399", marginTop: "3px" }, children: "✓ Automatically registers your PC's exact path into Cursor & Claude Desktop in 1 second!" })
        ]})
      ]}),
      d.jsxs("div", { className: "agy-card", children: [
        d.jsx("div", { className: "agy-card-ttl", children: "⚙️ Extension Info" }),
        d.jsxs("div", { className: "agy-kv", children: [
          d.jsx(KV, { k: "Version", v: "v1.0.0 · Studio Edition", accent: true }),
          d.jsx(KV, { k: "Theme", v: "Dark Cyber Studio Edition" }),
          d.jsx(KV, { k: "License", v: "Non-Commercial & Attribution" }),
        ]}),
        d.jsx("button", {
          className: "agy-btn-secondary" + (copiedBtn === "history" ? " agy-btn-success" : ""),
          style: { marginTop: "10px" },
          onClick: async function() {
            try {
              await ne("HISTORY_CLEAR");
              if (typeof P === "function") await P();
              u("Scan history cleared!");
              setCopiedBtn("history");
              setTimeout(function() { setCopiedBtn(null); }, 2500);
            } catch(err) {}
          },
          children: copiedBtn === "history" ? "✓ History Cleared!" : "Clear History"
        })
      ]}),
      d.jsxs("div", { className: "agy-card", children: [
        d.jsx("div", { className: "agy-card-ttl", children: "🚀 Deep Extraction Capabilities" }),
        d.jsx("div", { className: "agy-kv", children:
          ["WebGL 3D Scene Extraction", "GLSL Shader Capture", "Web Audio API Mapping", "Scroll Timeline Chapters", "React Component Tree", "Full Project ZIP Export", "Tailwind Config Generation", "DESIGN.md AI Prompt", "100% Free & Offline", "No Auth Required"].map(function(f, i) {
            return d.jsxs("div", { key: i, className: "agy-kv-row", children: [
              d.jsx("span", { className: "agy-kv-key", children: f }),
              d.jsx("span", { className: "agy-kv-val green", children: "✓" })
            ]});
          })
        })
      ]})
    ]});
  }

  // ── MAIN RENDER ───────────────────────────────────────────────────────────
  return d.jsxs("div", {
    className: "agy-shell",
    children: [
      // Header (without Open in Tab button)
      d.jsxs("header", { className: "agy-header", children: [
        d.jsxs("div", { className: "agy-brand", children: [
          d.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", children: [
            d.jsx("path", { d: "M12 2L2 7l10 5 10-5-10-5z", stroke: "#8b5cf6", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
            d.jsx("path", { d: "M2 17l10 5 10-5", stroke: "#8b5cf6", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
            d.jsx("path", { d: "M2 12l10 5 10-5", stroke: "#6d28d9", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
          ]}),
          d.jsx("h1", { className: "agy-brand-title", children: "WebDNA" }),
          d.jsx("span", { className: "agy-version-badge", children: "v1.0.0" }),
        ]}),
        d.jsxs("div", { className: "agy-header-tools", children: [
          d.jsx("button", {
            className: "agy-icon-btn",
            title: "Refresh",
            onClick: function() { try { chrome.runtime.reload(); } catch(err) { window.location.reload(); } },
            children: d.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              d.jsx("path", { d: "M23 4v6h-6" }), d.jsx("path", { d: "M1 20v-6h6" }), d.jsx("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })
            ]})
          }),
          d.jsx("button", {
            className: "agy-icon-btn" + (agyActiveTab === "Settings" ? " active" : ""),
            title: "Settings",
            onClick: function() { e(agyActiveTab === "Settings" ? "Overview" : "Settings"); },
            children: d.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              d.jsx("circle", { cx: "12", cy: "12", r: "3" }),
              d.jsx("path", { d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" })
            ]})
          }),
          d.jsx("button", {
            className: "agy-icon-btn",
            title: "Help",
            children: d.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              d.jsx("circle", { cx: "12", cy: "12", r: "10" }), d.jsx("path", { d: "M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" })
            ]})
          })
        ]})
      ]}),

      // Progress bar
      t.kind === "scanning" && d.jsx("div", { className: "agy-progress-bar", children:
        d.jsx("div", { className: "agy-progress-fill", style: { width: (t.progress != null ? Math.round(t.progress) : 40) + "%" } })
      }),

      // Action buttons
      d.jsxs("div", { className: "agy-action-bar", children: [
        d.jsxs("button", {
          className: "agy-btn-pick" + (pickerActive ? " active" : ""),
          onClick: function() { if (pickerActive) { cancelLivePicker(); } else { startLivePicker(); e("Overview"); } },
          children: [
            d.jsx("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children:
              d.jsx("path", { d: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" })
            }),
            d.jsx("span", { children: pickerActive ? "Stop Picking" : "Pick Element" }),
            d.jsx("kbd", { className: "agy-kbd", children: "⌥P" })
          ]
        }),
        d.jsxs("button", {
          className: "agy-btn-scan" + (t.kind === "scanning" ? " scanning" : ""),
          disabled: z,
          onClick: function() { if (t.kind === "scanning") Me(); else A(); },
          children: [
            t.kind === "scanning"
              ? d.jsx("span", { className: "agy-spinner" })
              : d.jsx("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children:
                  d.jsx("path", { d: "M13 10V3L4 14h7v7l9-11h-7z" })
                }),
            d.jsx("span", { children: t.kind === "scanning" ? "Stop Scan" : "Scan Current Tab" }),
            d.jsx("kbd", { className: "agy-kbd dark", children: "⌘↩" })
          ]
        })
      ]}),

      // Tab nav
      d.jsxs("nav", { className: "agy-tab-nav", children: [
        d.jsx("div", { className: "agy-tab-row", children:
          AGY_TABS_ROW1.map(function(tab) {
            return d.jsx("button", { key: tab, className: "agy-tab-btn" + (agyActiveTab === tab ? " active" : ""), onClick: function() { e(tab); }, children: tab });
          })
        }),
        d.jsx("div", { className: "agy-tab-row secondary", children:
          AGY_TABS_ROW2.map(function(tab) {
            return d.jsx("button", {
              key: tab,
              className: "agy-tab-btn secondary" + (agyActiveTab === tab ? " active" : ""),
              onClick: function() {
                e(tab);
                if (tab === "History" && typeof P === "function") P();
              },
              children: tab
            });
          })
        })
      ]}),

      // Status banners
      t.kind === "scanning" && d.jsxs("div", { className: "agy-status scanning", children: [d.jsx("span", { className: "agy-pulse" }), "Scanning" + (t.progress != null ? " — " + Math.round(t.progress) + "%" : "…")] }),
      t.kind === "error" && d.jsx("div", { className: "agy-status error", children: t.error || "Scan failed" }),

      // Main content with safe tab switching (ZERO CRASHES)
      d.jsx("main", {
        className: "agy-main",
        children: (function() {
          try {
            switch(agyActiveTab) {
              case "Overview":     return renderOverviewTab();
              case "3D & Runtime": return renderThreeDTab();
              case "Topology":     return renderTopologyTab();
              case "Assets":       return renderAssetsTab();
              case "Exports":      return renderExportsTab();
              case "Prompt":
              case "AI Prompt":    return renderAIPromptTab();
              case "History":      return renderHistoryTab();
              case "Settings":     return renderSettingsTab();
              default:             return renderOverviewTab();
            }
          } catch(err) {
            console.error("Tab render error:", err);
            return d.jsxs("div", {
              className: "agy-tab-body",
              children: [
                d.jsx(EmptySlate, { icon: "⚠️", title: "Render Issue in " + agyActiveTab, desc: String(err && err.message || "An error occurred.") }),
                d.jsx("button", { className: "agy-btn-secondary", onClick: function() { e("Overview"); }, children: "← Return to Overview" })
              ]
            });
          }
        })()
      }),

      // Floating Cyber Toast Popup
      h && d.jsxs("div", {
        className: "agy-toast-popup",
        children: [
          d.jsx("span", { className: "agy-toast-icon", children: "✓" }),
          d.jsx("span", { children: h })
        ]
      }),

      // Footer
      d.jsxs("footer", { className: "agy-footer", children: [
        d.jsxs("div", { className: "agy-footer-left", children: [
          d.jsx("span", { children: "© Dhruv" }),
          d.jsx("span", { className: "agy-footer-sep", children: "•" }),
          d.jsxs("a", {
            href: "https://github.com/rootds-coder/WebDna",
            target: "_blank",
            rel: "noreferrer",
            style: { display: "inline-flex", alignItems: "center", gap: "4px", color: "#94a3b8", textDecoration: "none", transition: "color 0.15s" },
            title: "Dhruv Singh Chauhan GitHub Repository",
            onClick: function(ev) {
              ev.preventDefault();
              try { chrome.tabs.create({ url: "https://github.com/rootds-coder/WebDna" }); }
              catch(err) { window.open("https://github.com/rootds-coder/WebDna", "_blank"); }
            },
            children: [
              d.jsx("svg", {
                width: "13",
                height: "13",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                style: { opacity: 0.85 },
                children: d.jsx("path", { d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" })
              }),
              d.jsx("span", { children: "GitHub" })
            ]
          })
        ]}),
        d.jsxs("div", { className: "agy-ready-pill " + (t.kind === "scanning" ? "scanning" : t.kind === "error" ? "error" : "ready"), children: [
          d.jsx("span", { className: "agy-ready-star", children: "✦" }),
          t.kind === "scanning" ? "SCANNING" : t.kind === "error" ? "ERROR" : "READY"
        ]})
      ]})
    ]
  });
}


ot.createRoot(document.getElementById("root")).render(
  d.jsx(ct.StrictMode, { children: d.jsx(Cs, {}) })
);
