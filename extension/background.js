var background=(function(){"use strict";function Xe(r){return r==null||typeof r=="function"?{main:r}:r}var b;(function(r){r.assertEqual=a=>a;function e(a){}r.assertIs=e;function t(a){throw new Error}r.assertNever=t,r.arrayToEnum=a=>{const s={};for(const o of a)s[o]=o;return s},r.getValidEnumValues=a=>{const s=r.objectKeys(a).filter(i=>typeof a[a[i]]!="number"),o={};for(const i of s)o[i]=a[i];return r.objectValues(o)},r.objectValues=a=>r.objectKeys(a).map(function(s){return a[s]}),r.objectKeys=typeof Object.keys=="function"?a=>Object.keys(a):a=>{const s=[];for(const o in a)Object.prototype.hasOwnProperty.call(a,o)&&s.push(o);return s},r.find=(a,s)=>{for(const o of a)if(s(o))return o},r.isInteger=typeof Number.isInteger=="function"?a=>Number.isInteger(a):a=>typeof a=="number"&&isFinite(a)&&Math.floor(a)===a;function n(a,s=" | "){return a.map(o=>typeof o=="string"?`'${o}'`:o).join(s)}r.joinValues=n,r.jsonStringifyReplacer=(a,s)=>typeof s=="bigint"?s.toString():s})(b||(b={}));var Ce;(function(r){r.mergeShapes=(e,t)=>({...e,...t})})(Ce||(Ce={}));const p=b.arrayToEnum(["string","nan","number","integer","float","boolean","date","bigint","symbol","function","undefined","null","array","object","unknown","promise","void","never","map","set"]),P=r=>{switch(typeof r){case"undefined":return p.undefined;case"string":return p.string;case"number":return isNaN(r)?p.nan:p.number;case"boolean":return p.boolean;case"function":return p.function;case"bigint":return p.bigint;case"symbol":return p.symbol;case"object":return Array.isArray(r)?p.array:r===null?p.null:r.then&&typeof r.then=="function"&&r.catch&&typeof r.catch=="function"?p.promise:typeof Map<"u"&&r instanceof Map?p.map:typeof Set<"u"&&r instanceof Set?p.set:typeof Date<"u"&&r instanceof Date?p.date:p.object;default:return p.unknown}},u=b.arrayToEnum(["invalid_type","invalid_literal","custom","invalid_union","invalid_union_discriminator","invalid_enum_value","unrecognized_keys","invalid_arguments","invalid_return_type","invalid_date","invalid_string","too_small","too_big","invalid_intersection_types","not_multiple_of","not_finite"]),Fe=r=>JSON.stringify(r,null,2).replace(/"([^"]+)":/g,"$1:");class S extends Error{constructor(e){super(),this.issues=[],this.addIssue=n=>{this.issues=[...this.issues,n]},this.addIssues=(n=[])=>{this.issues=[...this.issues,...n]};const t=new.target.prototype;Object.setPrototypeOf?Object.setPrototypeOf(this,t):this.__proto__=t,this.name="ZodError",this.issues=e}get errors(){return this.issues}format(e){const t=e||function(s){return s.message},n={_errors:[]},a=s=>{for(const o of s.issues)if(o.code==="invalid_union")o.unionErrors.map(a);else if(o.code==="invalid_return_type")a(o.returnTypeError);else if(o.code==="invalid_arguments")a(o.argumentsError);else if(o.path.length===0)n._errors.push(t(o));else{let i=n,d=0;for(;d<o.path.length;){const l=o.path[d];d===o.path.length-1?(i[l]=i[l]||{_errors:[]},i[l]._errors.push(t(o))):i[l]=i[l]||{_errors:[]},i=i[l],d++}}};return a(this),n}static assert(e){if(!(e instanceof S))throw new Error(`Not a ZodError: ${e}`)}toString(){return this.message}get message(){return JSON.stringify(this.issues,b.jsonStringifyReplacer,2)}get isEmpty(){return this.issues.length===0}flatten(e=t=>t.message){const t={},n=[];for(const a of this.issues)a.path.length>0?(t[a.path[0]]=t[a.path[0]]||[],t[a.path[0]].push(e(a))):n.push(e(a));return{formErrors:n,fieldErrors:t}}get formErrors(){return this.flatten()}}S.create=r=>new S(r);const G=(r,e)=>{let t;switch(r.code){case u.invalid_type:r.received===p.undefined?t="Required":t=`Expected ${r.expected}, received ${r.received}`;break;case u.invalid_literal:t=`Invalid literal value, expected ${JSON.stringify(r.expected,b.jsonStringifyReplacer)}`;break;case u.unrecognized_keys:t=`Unrecognized key(s) in object: ${b.joinValues(r.keys,", ")}`;break;case u.invalid_union:t="Invalid input";break;case u.invalid_union_discriminator:t=`Invalid discriminator value. Expected ${b.joinValues(r.options)}`;break;case u.invalid_enum_value:t=`Invalid enum value. Expected ${b.joinValues(r.options)}, received '${r.received}'`;break;case u.invalid_arguments:t="Invalid function arguments";break;case u.invalid_return_type:t="Invalid function return type";break;case u.invalid_date:t="Invalid date";break;case u.invalid_string:typeof r.validation=="object"?"includes"in r.validation?(t=`Invalid input: must include "${r.validation.includes}"`,typeof r.validation.position=="number"&&(t=`${t} at one or more positions greater than or equal to ${r.validation.position}`)):"startsWith"in r.validation?t=`Invalid input: must start with "${r.validation.startsWith}"`:"endsWith"in r.validation?t=`Invalid input: must end with "${r.validation.endsWith}"`:b.assertNever(r.validation):r.validation!=="regex"?t=`Invalid ${r.validation}`:t="Invalid";break;case u.too_small:r.type==="array"?t=`Array must contain ${r.exact?"exactly":r.inclusive?"at least":"more than"} ${r.minimum} element(s)`:r.type==="string"?t=`String must contain ${r.exact?"exactly":r.inclusive?"at least":"over"} ${r.minimum} character(s)`:r.type==="number"?t=`Number must be ${r.exact?"exactly equal to ":r.inclusive?"greater than or equal to ":"greater than "}${r.minimum}`:r.type==="date"?t=`Date must be ${r.exact?"exactly equal to ":r.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(r.minimum))}`:t="Invalid input";break;case u.too_big:r.type==="array"?t=`Array must contain ${r.exact?"exactly":r.inclusive?"at most":"less than"} ${r.maximum} element(s)`:r.type==="string"?t=`String must contain ${r.exact?"exactly":r.inclusive?"at most":"under"} ${r.maximum} character(s)`:r.type==="number"?t=`Number must be ${r.exact?"exactly":r.inclusive?"less than or equal to":"less than"} ${r.maximum}`:r.type==="bigint"?t=`BigInt must be ${r.exact?"exactly":r.inclusive?"less than or equal to":"less than"} ${r.maximum}`:r.type==="date"?t=`Date must be ${r.exact?"exactly":r.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(r.maximum))}`:t="Invalid input";break;case u.custom:t="Invalid input";break;case u.invalid_intersection_types:t="Intersection results could not be merged";break;case u.not_multiple_of:t=`Number must be a multiple of ${r.multipleOf}`;break;case u.not_finite:t="Number must be finite";break;default:t=e.defaultError,b.assertNever(r)}return{message:t}};let $e=G;function Qe(r){$e=r}function ve(){return $e}const ye=r=>{const{data:e,path:t,errorMaps:n,issueData:a}=r,s=[...t,...a.path||[]],o={...a,path:s};if(a.message!==void 0)return{...a,path:s,message:a.message};let i="";const d=n.filter(l=>!!l).slice().reverse();for(const l of d)i=l(o,{data:e,defaultError:i}).message;return{...a,path:s,message:i}},et=[];function f(r,e){const t=ve(),n=ye({issueData:e,data:r.data,path:r.path,errorMaps:[r.common.contextualErrorMap,r.schemaErrorMap,t,t===G?void 0:G].filter(a=>!!a)});r.common.issues.push(n)}class k{constructor(){this.value="valid"}dirty(){this.value==="valid"&&(this.value="dirty")}abort(){this.value!=="aborted"&&(this.value="aborted")}static mergeArray(e,t){const n=[];for(const a of t){if(a.status==="aborted")return v;a.status==="dirty"&&e.dirty(),n.push(a.value)}return{status:e.value,value:n}}static async mergeObjectAsync(e,t){const n=[];for(const a of t){const s=await a.key,o=await a.value;n.push({key:s,value:o})}return k.mergeObjectSync(e,n)}static mergeObjectSync(e,t){const n={};for(const a of t){const{key:s,value:o}=a;if(s.status==="aborted"||o.status==="aborted")return v;s.status==="dirty"&&e.dirty(),o.status==="dirty"&&e.dirty(),s.value!=="__proto__"&&(typeof o.value<"u"||a.alwaysSet)&&(n[s.value]=o.value)}return{status:e.value,value:n}}}const v=Object.freeze({status:"aborted"}),J=r=>({status:"dirty",value:r}),T=r=>({status:"valid",value:r}),Ie=r=>r.status==="aborted",Oe=r=>r.status==="dirty",ee=r=>r.status==="valid",te=r=>typeof Promise<"u"&&r instanceof Promise;function _e(r,e,t,n){if(typeof e=="function"?r!==e||!0:!e.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e.get(r)}function De(r,e,t,n,a){if(typeof e=="function"?r!==e||!0:!e.has(r))throw new TypeError("Cannot write private member to an object whose class did not declare it");return e.set(r,t),t}typeof SuppressedError=="function"&&SuppressedError;var m;(function(r){r.errToObj=e=>typeof e=="string"?{message:e}:e||{},r.toString=e=>typeof e=="string"?e:e?.message})(m||(m={}));var re,ne;class O{constructor(e,t,n,a){this._cachedPath=[],this.parent=e,this.data=t,this._path=n,this._key=a}get path(){return this._cachedPath.length||(this._key instanceof Array?this._cachedPath.push(...this._path,...this._key):this._cachedPath.push(...this._path,this._key)),this._cachedPath}}const Ve=(r,e)=>{if(ee(e))return{success:!0,data:e.value};if(!r.common.issues.length)throw new Error("Validation failed but no issues detected.");return{success:!1,get error(){if(this._error)return this._error;const t=new S(r.common.issues);return this._error=t,this._error}}};function y(r){if(!r)return{};const{errorMap:e,invalid_type_error:t,required_error:n,description:a}=r;if(e&&(t||n))throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);return e?{errorMap:e,description:a}:{errorMap:(o,i)=>{var d,l;const{message:h}=r;return o.code==="invalid_enum_value"?{message:h??i.defaultError}:typeof i.data>"u"?{message:(d=h??n)!==null&&d!==void 0?d:i.defaultError}:o.code!=="invalid_type"?{message:i.defaultError}:{message:(l=h??t)!==null&&l!==void 0?l:i.defaultError}},description:a}}class _{constructor(e){this.spa=this.safeParseAsync,this._def=e,this.parse=this.parse.bind(this),this.safeParse=this.safeParse.bind(this),this.parseAsync=this.parseAsync.bind(this),this.safeParseAsync=this.safeParseAsync.bind(this),this.spa=this.spa.bind(this),this.refine=this.refine.bind(this),this.refinement=this.refinement.bind(this),this.superRefine=this.superRefine.bind(this),this.optional=this.optional.bind(this),this.nullable=this.nullable.bind(this),this.nullish=this.nullish.bind(this),this.array=this.array.bind(this),this.promise=this.promise.bind(this),this.or=this.or.bind(this),this.and=this.and.bind(this),this.transform=this.transform.bind(this),this.brand=this.brand.bind(this),this.default=this.default.bind(this),this.catch=this.catch.bind(this),this.describe=this.describe.bind(this),this.pipe=this.pipe.bind(this),this.readonly=this.readonly.bind(this),this.isNullable=this.isNullable.bind(this),this.isOptional=this.isOptional.bind(this)}get description(){return this._def.description}_getType(e){return P(e.data)}_getOrReturnCtx(e,t){return t||{common:e.parent.common,data:e.data,parsedType:P(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}_processInputParams(e){return{status:new k,ctx:{common:e.parent.common,data:e.data,parsedType:P(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}}_parseSync(e){const t=this._parse(e);if(te(t))throw new Error("Synchronous parse encountered promise.");return t}_parseAsync(e){const t=this._parse(e);return Promise.resolve(t)}parse(e,t){const n=this.safeParse(e,t);if(n.success)return n.data;throw n.error}safeParse(e,t){var n;const a={common:{issues:[],async:(n=t?.async)!==null&&n!==void 0?n:!1,contextualErrorMap:t?.errorMap},path:t?.path||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:P(e)},s=this._parseSync({data:e,path:a.path,parent:a});return Ve(a,s)}async parseAsync(e,t){const n=await this.safeParseAsync(e,t);if(n.success)return n.data;throw n.error}async safeParseAsync(e,t){const n={common:{issues:[],contextualErrorMap:t?.errorMap,async:!0},path:t?.path||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:P(e)},a=this._parse({data:e,path:n.path,parent:n}),s=await(te(a)?a:Promise.resolve(a));return Ve(n,s)}refine(e,t){const n=a=>typeof t=="string"||typeof t>"u"?{message:t}:typeof t=="function"?t(a):t;return this._refinement((a,s)=>{const o=e(a),i=()=>s.addIssue({code:u.custom,...n(a)});return typeof Promise<"u"&&o instanceof Promise?o.then(d=>d?!0:(i(),!1)):o?!0:(i(),!1)})}refinement(e,t){return this._refinement((n,a)=>e(n)?!0:(a.addIssue(typeof t=="function"?t(n,a):t),!1))}_refinement(e){return new C({schema:this,typeName:g.ZodEffects,effect:{type:"refinement",refinement:e}})}superRefine(e){return this._refinement(e)}optional(){return R.create(this,this._def)}nullable(){return L.create(this,this._def)}nullish(){return this.nullable().optional()}array(){return N.create(this,this._def)}promise(){return F.create(this,this._def)}or(e){return oe.create([this,e],this._def)}and(e){return ce.create(this,e,this._def)}transform(e){return new C({...y(this._def),schema:this,typeName:g.ZodEffects,effect:{type:"transform",transform:e}})}default(e){const t=typeof e=="function"?e:()=>e;return new he({...y(this._def),innerType:this,defaultValue:t,typeName:g.ZodDefault})}brand(){return new Ze({typeName:g.ZodBranded,type:this,...y(this._def)})}catch(e){const t=typeof e=="function"?e:()=>e;return new pe({...y(this._def),innerType:this,catchValue:t,typeName:g.ZodCatch})}describe(e){const t=this.constructor;return new t({...this._def,description:e})}pipe(e){return me.create(this,e)}readonly(){return ge.create(this)}isOptional(){return this.safeParse(void 0).success}isNullable(){return this.safeParse(null).success}}const tt=/^c[^\s-]{8,}$/i,rt=/^[0-9a-z]+$/,nt=/^[0-9A-HJKMNP-TV-Z]{26}$/,at=/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,st=/^[a-z0-9_-]{21}$/i,it=/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,ot=/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,ct="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";let Ae;const dt=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,ut=/^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,lt=/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,Le="((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",ft=new RegExp(`^${Le}$`);function Ue(r){let e="([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";return r.precision?e=`${e}\\.\\d{${r.precision}}`:r.precision==null&&(e=`${e}(\\.\\d+)?`),e}function ht(r){return new RegExp(`^${Ue(r)}$`)}function Be(r){let e=`${Le}T${Ue(r)}`;const t=[];return t.push(r.local?"Z?":"Z"),r.offset&&t.push("([+-]\\d{2}:?\\d{2})"),e=`${e}(${t.join("|")})`,new RegExp(`^${e}$`)}function pt(r,e){return!!((e==="v4"||!e)&&dt.test(r)||(e==="v6"||!e)&&ut.test(r))}class E extends _{_parse(e){if(this._def.coerce&&(e.data=String(e.data)),this._getType(e)!==p.string){const s=this._getOrReturnCtx(e);return f(s,{code:u.invalid_type,expected:p.string,received:s.parsedType}),v}const n=new k;let a;for(const s of this._def.checks)if(s.kind==="min")e.data.length<s.value&&(a=this._getOrReturnCtx(e,a),f(a,{code:u.too_small,minimum:s.value,type:"string",inclusive:!0,exact:!1,message:s.message}),n.dirty());else if(s.kind==="max")e.data.length>s.value&&(a=this._getOrReturnCtx(e,a),f(a,{code:u.too_big,maximum:s.value,type:"string",inclusive:!0,exact:!1,message:s.message}),n.dirty());else if(s.kind==="length"){const o=e.data.length>s.value,i=e.data.length<s.value;(o||i)&&(a=this._getOrReturnCtx(e,a),o?f(a,{code:u.too_big,maximum:s.value,type:"string",inclusive:!0,exact:!0,message:s.message}):i&&f(a,{code:u.too_small,minimum:s.value,type:"string",inclusive:!0,exact:!0,message:s.message}),n.dirty())}else if(s.kind==="email")ot.test(e.data)||(a=this._getOrReturnCtx(e,a),f(a,{validation:"email",code:u.invalid_string,message:s.message}),n.dirty());else if(s.kind==="emoji")Ae||(Ae=new RegExp(ct,"u")),Ae.test(e.data)||(a=this._getOrReturnCtx(e,a),f(a,{validation:"emoji",code:u.invalid_string,message:s.message}),n.dirty());else if(s.kind==="uuid")at.test(e.data)||(a=this._getOrReturnCtx(e,a),f(a,{validation:"uuid",code:u.invalid_string,message:s.message}),n.dirty());else if(s.kind==="nanoid")st.test(e.data)||(a=this._getOrReturnCtx(e,a),f(a,{validation:"nanoid",code:u.invalid_string,message:s.message}),n.dirty());else if(s.kind==="cuid")tt.test(e.data)||(a=this._getOrReturnCtx(e,a),f(a,{validation:"cuid",code:u.invalid_string,message:s.message}),n.dirty());else if(s.kind==="cuid2")rt.test(e.data)||(a=this._getOrReturnCtx(e,a),f(a,{validation:"cuid2",code:u.invalid_string,message:s.message}),n.dirty());else if(s.kind==="ulid")nt.test(e.data)||(a=this._getOrReturnCtx(e,a),f(a,{validation:"ulid",code:u.invalid_string,message:s.message}),n.dirty());else if(s.kind==="url")try{new URL(e.data)}catch{a=this._getOrReturnCtx(e,a),f(a,{validation:"url",code:u.invalid_string,message:s.message}),n.dirty()}else s.kind==="regex"?(s.regex.lastIndex=0,s.regex.test(e.data)||(a=this._getOrReturnCtx(e,a),f(a,{validation:"regex",code:u.invalid_string,message:s.message}),n.dirty())):s.kind==="trim"?e.data=e.data.trim():s.kind==="includes"?e.data.includes(s.value,s.position)||(a=this._getOrReturnCtx(e,a),f(a,{code:u.invalid_string,validation:{includes:s.value,position:s.position},message:s.message}),n.dirty()):s.kind==="toLowerCase"?e.data=e.data.toLowerCase():s.kind==="toUpperCase"?e.data=e.data.toUpperCase():s.kind==="startsWith"?e.data.startsWith(s.value)||(a=this._getOrReturnCtx(e,a),f(a,{code:u.invalid_string,validation:{startsWith:s.value},message:s.message}),n.dirty()):s.kind==="endsWith"?e.data.endsWith(s.value)||(a=this._getOrReturnCtx(e,a),f(a,{code:u.invalid_string,validation:{endsWith:s.value},message:s.message}),n.dirty()):s.kind==="datetime"?Be(s).test(e.data)||(a=this._getOrReturnCtx(e,a),f(a,{code:u.invalid_string,validation:"datetime",message:s.message}),n.dirty()):s.kind==="date"?ft.test(e.data)||(a=this._getOrReturnCtx(e,a),f(a,{code:u.invalid_string,validation:"date",message:s.message}),n.dirty()):s.kind==="time"?ht(s).test(e.data)||(a=this._getOrReturnCtx(e,a),f(a,{code:u.invalid_string,validation:"time",message:s.message}),n.dirty()):s.kind==="duration"?it.test(e.data)||(a=this._getOrReturnCtx(e,a),f(a,{validation:"duration",code:u.invalid_string,message:s.message}),n.dirty()):s.kind==="ip"?pt(e.data,s.version)||(a=this._getOrReturnCtx(e,a),f(a,{validation:"ip",code:u.invalid_string,message:s.message}),n.dirty()):s.kind==="base64"?lt.test(e.data)||(a=this._getOrReturnCtx(e,a),f(a,{validation:"base64",code:u.invalid_string,message:s.message}),n.dirty()):b.assertNever(s);return{status:n.value,value:e.data}}_regex(e,t,n){return this.refinement(a=>e.test(a),{validation:t,code:u.invalid_string,...m.errToObj(n)})}_addCheck(e){return new E({...this._def,checks:[...this._def.checks,e]})}email(e){return this._addCheck({kind:"email",...m.errToObj(e)})}url(e){return this._addCheck({kind:"url",...m.errToObj(e)})}emoji(e){return this._addCheck({kind:"emoji",...m.errToObj(e)})}uuid(e){return this._addCheck({kind:"uuid",...m.errToObj(e)})}nanoid(e){return this._addCheck({kind:"nanoid",...m.errToObj(e)})}cuid(e){return this._addCheck({kind:"cuid",...m.errToObj(e)})}cuid2(e){return this._addCheck({kind:"cuid2",...m.errToObj(e)})}ulid(e){return this._addCheck({kind:"ulid",...m.errToObj(e)})}base64(e){return this._addCheck({kind:"base64",...m.errToObj(e)})}ip(e){return this._addCheck({kind:"ip",...m.errToObj(e)})}datetime(e){var t,n;return typeof e=="string"?this._addCheck({kind:"datetime",precision:null,offset:!1,local:!1,message:e}):this._addCheck({kind:"datetime",precision:typeof e?.precision>"u"?null:e?.precision,offset:(t=e?.offset)!==null&&t!==void 0?t:!1,local:(n=e?.local)!==null&&n!==void 0?n:!1,...m.errToObj(e?.message)})}date(e){return this._addCheck({kind:"date",message:e})}time(e){return typeof e=="string"?this._addCheck({kind:"time",precision:null,message:e}):this._addCheck({kind:"time",precision:typeof e?.precision>"u"?null:e?.precision,...m.errToObj(e?.message)})}duration(e){return this._addCheck({kind:"duration",...m.errToObj(e)})}regex(e,t){return this._addCheck({kind:"regex",regex:e,...m.errToObj(t)})}includes(e,t){return this._addCheck({kind:"includes",value:e,position:t?.position,...m.errToObj(t?.message)})}startsWith(e,t){return this._addCheck({kind:"startsWith",value:e,...m.errToObj(t)})}endsWith(e,t){return this._addCheck({kind:"endsWith",value:e,...m.errToObj(t)})}min(e,t){return this._addCheck({kind:"min",value:e,...m.errToObj(t)})}max(e,t){return this._addCheck({kind:"max",value:e,...m.errToObj(t)})}length(e,t){return this._addCheck({kind:"length",value:e,...m.errToObj(t)})}nonempty(e){return this.min(1,m.errToObj(e))}trim(){return new E({...this._def,checks:[...this._def.checks,{kind:"trim"}]})}toLowerCase(){return new E({...this._def,checks:[...this._def.checks,{kind:"toLowerCase"}]})}toUpperCase(){return new E({...this._def,checks:[...this._def.checks,{kind:"toUpperCase"}]})}get isDatetime(){return!!this._def.checks.find(e=>e.kind==="datetime")}get isDate(){return!!this._def.checks.find(e=>e.kind==="date")}get isTime(){return!!this._def.checks.find(e=>e.kind==="time")}get isDuration(){return!!this._def.checks.find(e=>e.kind==="duration")}get isEmail(){return!!this._def.checks.find(e=>e.kind==="email")}get isURL(){return!!this._def.checks.find(e=>e.kind==="url")}get isEmoji(){return!!this._def.checks.find(e=>e.kind==="emoji")}get isUUID(){return!!this._def.checks.find(e=>e.kind==="uuid")}get isNANOID(){return!!this._def.checks.find(e=>e.kind==="nanoid")}get isCUID(){return!!this._def.checks.find(e=>e.kind==="cuid")}get isCUID2(){return!!this._def.checks.find(e=>e.kind==="cuid2")}get isULID(){return!!this._def.checks.find(e=>e.kind==="ulid")}get isIP(){return!!this._def.checks.find(e=>e.kind==="ip")}get isBase64(){return!!this._def.checks.find(e=>e.kind==="base64")}get minLength(){let e=null;for(const t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxLength(){let e=null;for(const t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}}E.create=r=>{var e;return new E({checks:[],typeName:g.ZodString,coerce:(e=r?.coerce)!==null&&e!==void 0?e:!1,...y(r)})};function mt(r,e){const t=(r.toString().split(".")[1]||"").length,n=(e.toString().split(".")[1]||"").length,a=t>n?t:n,s=parseInt(r.toFixed(a).replace(".","")),o=parseInt(e.toFixed(a).replace(".",""));return s%o/Math.pow(10,a)}class $ extends _{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte,this.step=this.multipleOf}_parse(e){if(this._def.coerce&&(e.data=Number(e.data)),this._getType(e)!==p.number){const s=this._getOrReturnCtx(e);return f(s,{code:u.invalid_type,expected:p.number,received:s.parsedType}),v}let n;const a=new k;for(const s of this._def.checks)s.kind==="int"?b.isInteger(e.data)||(n=this._getOrReturnCtx(e,n),f(n,{code:u.invalid_type,expected:"integer",received:"float",message:s.message}),a.dirty()):s.kind==="min"?(s.inclusive?e.data<s.value:e.data<=s.value)&&(n=this._getOrReturnCtx(e,n),f(n,{code:u.too_small,minimum:s.value,type:"number",inclusive:s.inclusive,exact:!1,message:s.message}),a.dirty()):s.kind==="max"?(s.inclusive?e.data>s.value:e.data>=s.value)&&(n=this._getOrReturnCtx(e,n),f(n,{code:u.too_big,maximum:s.value,type:"number",inclusive:s.inclusive,exact:!1,message:s.message}),a.dirty()):s.kind==="multipleOf"?mt(e.data,s.value)!==0&&(n=this._getOrReturnCtx(e,n),f(n,{code:u.not_multiple_of,multipleOf:s.value,message:s.message}),a.dirty()):s.kind==="finite"?Number.isFinite(e.data)||(n=this._getOrReturnCtx(e,n),f(n,{code:u.not_finite,message:s.message}),a.dirty()):b.assertNever(s);return{status:a.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,m.toString(t))}gt(e,t){return this.setLimit("min",e,!1,m.toString(t))}lte(e,t){return this.setLimit("max",e,!0,m.toString(t))}lt(e,t){return this.setLimit("max",e,!1,m.toString(t))}setLimit(e,t,n,a){return new $({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:n,message:m.toString(a)}]})}_addCheck(e){return new $({...this._def,checks:[...this._def.checks,e]})}int(e){return this._addCheck({kind:"int",message:m.toString(e)})}positive(e){return this._addCheck({kind:"min",value:0,inclusive:!1,message:m.toString(e)})}negative(e){return this._addCheck({kind:"max",value:0,inclusive:!1,message:m.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:0,inclusive:!0,message:m.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:0,inclusive:!0,message:m.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:m.toString(t)})}finite(e){return this._addCheck({kind:"finite",message:m.toString(e)})}safe(e){return this._addCheck({kind:"min",inclusive:!0,value:Number.MIN_SAFE_INTEGER,message:m.toString(e)})._addCheck({kind:"max",inclusive:!0,value:Number.MAX_SAFE_INTEGER,message:m.toString(e)})}get minValue(){let e=null;for(const t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(const t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}get isInt(){return!!this._def.checks.find(e=>e.kind==="int"||e.kind==="multipleOf"&&b.isInteger(e.value))}get isFinite(){let e=null,t=null;for(const n of this._def.checks){if(n.kind==="finite"||n.kind==="int"||n.kind==="multipleOf")return!0;n.kind==="min"?(t===null||n.value>t)&&(t=n.value):n.kind==="max"&&(e===null||n.value<e)&&(e=n.value)}return Number.isFinite(t)&&Number.isFinite(e)}}$.create=r=>new $({checks:[],typeName:g.ZodNumber,coerce:r?.coerce||!1,...y(r)});class D extends _{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte}_parse(e){if(this._def.coerce&&(e.data=BigInt(e.data)),this._getType(e)!==p.bigint){const s=this._getOrReturnCtx(e);return f(s,{code:u.invalid_type,expected:p.bigint,received:s.parsedType}),v}let n;const a=new k;for(const s of this._def.checks)s.kind==="min"?(s.inclusive?e.data<s.value:e.data<=s.value)&&(n=this._getOrReturnCtx(e,n),f(n,{code:u.too_small,type:"bigint",minimum:s.value,inclusive:s.inclusive,message:s.message}),a.dirty()):s.kind==="max"?(s.inclusive?e.data>s.value:e.data>=s.value)&&(n=this._getOrReturnCtx(e,n),f(n,{code:u.too_big,type:"bigint",maximum:s.value,inclusive:s.inclusive,message:s.message}),a.dirty()):s.kind==="multipleOf"?e.data%s.value!==BigInt(0)&&(n=this._getOrReturnCtx(e,n),f(n,{code:u.not_multiple_of,multipleOf:s.value,message:s.message}),a.dirty()):b.assertNever(s);return{status:a.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,m.toString(t))}gt(e,t){return this.setLimit("min",e,!1,m.toString(t))}lte(e,t){return this.setLimit("max",e,!0,m.toString(t))}lt(e,t){return this.setLimit("max",e,!1,m.toString(t))}setLimit(e,t,n,a){return new D({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:n,message:m.toString(a)}]})}_addCheck(e){return new D({...this._def,checks:[...this._def.checks,e]})}positive(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!1,message:m.toString(e)})}negative(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!1,message:m.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!0,message:m.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!0,message:m.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:m.toString(t)})}get minValue(){let e=null;for(const t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(const t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}}D.create=r=>{var e;return new D({checks:[],typeName:g.ZodBigInt,coerce:(e=r?.coerce)!==null&&e!==void 0?e:!1,...y(r)})};class ae extends _{_parse(e){if(this._def.coerce&&(e.data=!!e.data),this._getType(e)!==p.boolean){const n=this._getOrReturnCtx(e);return f(n,{code:u.invalid_type,expected:p.boolean,received:n.parsedType}),v}return T(e.data)}}ae.create=r=>new ae({typeName:g.ZodBoolean,coerce:r?.coerce||!1,...y(r)});class z extends _{_parse(e){if(this._def.coerce&&(e.data=new Date(e.data)),this._getType(e)!==p.date){const s=this._getOrReturnCtx(e);return f(s,{code:u.invalid_type,expected:p.date,received:s.parsedType}),v}if(isNaN(e.data.getTime())){const s=this._getOrReturnCtx(e);return f(s,{code:u.invalid_date}),v}const n=new k;let a;for(const s of this._def.checks)s.kind==="min"?e.data.getTime()<s.value&&(a=this._getOrReturnCtx(e,a),f(a,{code:u.too_small,message:s.message,inclusive:!0,exact:!1,minimum:s.value,type:"date"}),n.dirty()):s.kind==="max"?e.data.getTime()>s.value&&(a=this._getOrReturnCtx(e,a),f(a,{code:u.too_big,message:s.message,inclusive:!0,exact:!1,maximum:s.value,type:"date"}),n.dirty()):b.assertNever(s);return{status:n.value,value:new Date(e.data.getTime())}}_addCheck(e){return new z({...this._def,checks:[...this._def.checks,e]})}min(e,t){return this._addCheck({kind:"min",value:e.getTime(),message:m.toString(t)})}max(e,t){return this._addCheck({kind:"max",value:e.getTime(),message:m.toString(t)})}get minDate(){let e=null;for(const t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e!=null?new Date(e):null}get maxDate(){let e=null;for(const t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e!=null?new Date(e):null}}z.create=r=>new z({checks:[],coerce:r?.coerce||!1,typeName:g.ZodDate,...y(r)});class be extends _{_parse(e){if(this._getType(e)!==p.symbol){const n=this._getOrReturnCtx(e);return f(n,{code:u.invalid_type,expected:p.symbol,received:n.parsedType}),v}return T(e.data)}}be.create=r=>new be({typeName:g.ZodSymbol,...y(r)});class se extends _{_parse(e){if(this._getType(e)!==p.undefined){const n=this._getOrReturnCtx(e);return f(n,{code:u.invalid_type,expected:p.undefined,received:n.parsedType}),v}return T(e.data)}}se.create=r=>new se({typeName:g.ZodUndefined,...y(r)});class ie extends _{_parse(e){if(this._getType(e)!==p.null){const n=this._getOrReturnCtx(e);return f(n,{code:u.invalid_type,expected:p.null,received:n.parsedType}),v}return T(e.data)}}ie.create=r=>new ie({typeName:g.ZodNull,...y(r)});class Y extends _{constructor(){super(...arguments),this._any=!0}_parse(e){return T(e.data)}}Y.create=r=>new Y({typeName:g.ZodAny,...y(r)});class q extends _{constructor(){super(...arguments),this._unknown=!0}_parse(e){return T(e.data)}}q.create=r=>new q({typeName:g.ZodUnknown,...y(r)});class j extends _{_parse(e){const t=this._getOrReturnCtx(e);return f(t,{code:u.invalid_type,expected:p.never,received:t.parsedType}),v}}j.create=r=>new j({typeName:g.ZodNever,...y(r)});class xe extends _{_parse(e){if(this._getType(e)!==p.undefined){const n=this._getOrReturnCtx(e);return f(n,{code:u.invalid_type,expected:p.void,received:n.parsedType}),v}return T(e.data)}}xe.create=r=>new xe({typeName:g.ZodVoid,...y(r)});class N extends _{_parse(e){const{ctx:t,status:n}=this._processInputParams(e),a=this._def;if(t.parsedType!==p.array)return f(t,{code:u.invalid_type,expected:p.array,received:t.parsedType}),v;if(a.exactLength!==null){const o=t.data.length>a.exactLength.value,i=t.data.length<a.exactLength.value;(o||i)&&(f(t,{code:o?u.too_big:u.too_small,minimum:i?a.exactLength.value:void 0,maximum:o?a.exactLength.value:void 0,type:"array",inclusive:!0,exact:!0,message:a.exactLength.message}),n.dirty())}if(a.minLength!==null&&t.data.length<a.minLength.value&&(f(t,{code:u.too_small,minimum:a.minLength.value,type:"array",inclusive:!0,exact:!1,message:a.minLength.message}),n.dirty()),a.maxLength!==null&&t.data.length>a.maxLength.value&&(f(t,{code:u.too_big,maximum:a.maxLength.value,type:"array",inclusive:!0,exact:!1,message:a.maxLength.message}),n.dirty()),t.common.async)return Promise.all([...t.data].map((o,i)=>a.type._parseAsync(new O(t,o,t.path,i)))).then(o=>k.mergeArray(n,o));const s=[...t.data].map((o,i)=>a.type._parseSync(new O(t,o,t.path,i)));return k.mergeArray(n,s)}get element(){return this._def.type}min(e,t){return new N({...this._def,minLength:{value:e,message:m.toString(t)}})}max(e,t){return new N({...this._def,maxLength:{value:e,message:m.toString(t)}})}length(e,t){return new N({...this._def,exactLength:{value:e,message:m.toString(t)}})}nonempty(e){return this.min(1,e)}}N.create=(r,e)=>new N({type:r,minLength:null,maxLength:null,exactLength:null,typeName:g.ZodArray,...y(e)});function K(r){if(r instanceof x){const e={};for(const t in r.shape){const n=r.shape[t];e[t]=R.create(K(n))}return new x({...r._def,shape:()=>e})}else return r instanceof N?new N({...r._def,type:K(r.element)}):r instanceof R?R.create(K(r.unwrap())):r instanceof L?L.create(K(r.unwrap())):r instanceof A?A.create(r.items.map(e=>K(e))):r}class x extends _{constructor(){super(...arguments),this._cached=null,this.nonstrict=this.passthrough,this.augment=this.extend}_getCached(){if(this._cached!==null)return this._cached;const e=this._def.shape(),t=b.objectKeys(e);return this._cached={shape:e,keys:t}}_parse(e){if(this._getType(e)!==p.object){const l=this._getOrReturnCtx(e);return f(l,{code:u.invalid_type,expected:p.object,received:l.parsedType}),v}const{status:n,ctx:a}=this._processInputParams(e),{shape:s,keys:o}=this._getCached(),i=[];if(!(this._def.catchall instanceof j&&this._def.unknownKeys==="strip"))for(const l in a.data)o.includes(l)||i.push(l);const d=[];for(const l of o){const h=s[l],w=a.data[l];d.push({key:{status:"valid",value:l},value:h._parse(new O(a,w,a.path,l)),alwaysSet:l in a.data})}if(this._def.catchall instanceof j){const l=this._def.unknownKeys;if(l==="passthrough")for(const h of i)d.push({key:{status:"valid",value:h},value:{status:"valid",value:a.data[h]}});else if(l==="strict")i.length>0&&(f(a,{code:u.unrecognized_keys,keys:i}),n.dirty());else if(l!=="strip")throw new Error("Internal ZodObject error: invalid unknownKeys value.")}else{const l=this._def.catchall;for(const h of i){const w=a.data[h];d.push({key:{status:"valid",value:h},value:l._parse(new O(a,w,a.path,h)),alwaysSet:h in a.data})}}return a.common.async?Promise.resolve().then(async()=>{const l=[];for(const h of d){const w=await h.key,U=await h.value;l.push({key:w,value:U,alwaysSet:h.alwaysSet})}return l}).then(l=>k.mergeObjectSync(n,l)):k.mergeObjectSync(n,d)}get shape(){return this._def.shape()}strict(e){return m.errToObj,new x({...this._def,unknownKeys:"strict",...e!==void 0?{errorMap:(t,n)=>{var a,s,o,i;const d=(o=(s=(a=this._def).errorMap)===null||s===void 0?void 0:s.call(a,t,n).message)!==null&&o!==void 0?o:n.defaultError;return t.code==="unrecognized_keys"?{message:(i=m.errToObj(e).message)!==null&&i!==void 0?i:d}:{message:d}}}:{}})}strip(){return new x({...this._def,unknownKeys:"strip"})}passthrough(){return new x({...this._def,unknownKeys:"passthrough"})}extend(e){return new x({...this._def,shape:()=>({...this._def.shape(),...e})})}merge(e){return new x({unknownKeys:e._def.unknownKeys,catchall:e._def.catchall,shape:()=>({...this._def.shape(),...e._def.shape()}),typeName:g.ZodObject})}setKey(e,t){return this.augment({[e]:t})}catchall(e){return new x({...this._def,catchall:e})}pick(e){const t={};return b.objectKeys(e).forEach(n=>{e[n]&&this.shape[n]&&(t[n]=this.shape[n])}),new x({...this._def,shape:()=>t})}omit(e){const t={};return b.objectKeys(this.shape).forEach(n=>{e[n]||(t[n]=this.shape[n])}),new x({...this._def,shape:()=>t})}deepPartial(){return K(this)}partial(e){const t={};return b.objectKeys(this.shape).forEach(n=>{const a=this.shape[n];e&&!e[n]?t[n]=a:t[n]=a.optional()}),new x({...this._def,shape:()=>t})}required(e){const t={};return b.objectKeys(this.shape).forEach(n=>{if(e&&!e[n])t[n]=this.shape[n];else{let s=this.shape[n];for(;s instanceof R;)s=s._def.innerType;t[n]=s}}),new x({...this._def,shape:()=>t})}keyof(){return ze(b.objectKeys(this.shape))}}x.create=(r,e)=>new x({shape:()=>r,unknownKeys:"strip",catchall:j.create(),typeName:g.ZodObject,...y(e)}),x.strictCreate=(r,e)=>new x({shape:()=>r,unknownKeys:"strict",catchall:j.create(),typeName:g.ZodObject,...y(e)}),x.lazycreate=(r,e)=>new x({shape:r,unknownKeys:"strip",catchall:j.create(),typeName:g.ZodObject,...y(e)});class oe extends _{_parse(e){const{ctx:t}=this._processInputParams(e),n=this._def.options;function a(s){for(const i of s)if(i.result.status==="valid")return i.result;for(const i of s)if(i.result.status==="dirty")return t.common.issues.push(...i.ctx.common.issues),i.result;const o=s.map(i=>new S(i.ctx.common.issues));return f(t,{code:u.invalid_union,unionErrors:o}),v}if(t.common.async)return Promise.all(n.map(async s=>{const o={...t,common:{...t.common,issues:[]},parent:null};return{result:await s._parseAsync({data:t.data,path:t.path,parent:o}),ctx:o}})).then(a);{let s;const o=[];for(const d of n){const l={...t,common:{...t.common,issues:[]},parent:null},h=d._parseSync({data:t.data,path:t.path,parent:l});if(h.status==="valid")return h;h.status==="dirty"&&!s&&(s={result:h,ctx:l}),l.common.issues.length&&o.push(l.common.issues)}if(s)return t.common.issues.push(...s.ctx.common.issues),s.result;const i=o.map(d=>new S(d));return f(t,{code:u.invalid_union,unionErrors:i}),v}}get options(){return this._def.options}}oe.create=(r,e)=>new oe({options:r,typeName:g.ZodUnion,...y(e)});const M=r=>r instanceof ue?M(r.schema):r instanceof C?M(r.innerType()):r instanceof le?[r.value]:r instanceof V?r.options:r instanceof fe?b.objectValues(r.enum):r instanceof he?M(r._def.innerType):r instanceof se?[void 0]:r instanceof ie?[null]:r instanceof R?[void 0,...M(r.unwrap())]:r instanceof L?[null,...M(r.unwrap())]:r instanceof Ze||r instanceof ge?M(r.unwrap()):r instanceof pe?M(r._def.innerType):[];class we extends _{_parse(e){const{ctx:t}=this._processInputParams(e);if(t.parsedType!==p.object)return f(t,{code:u.invalid_type,expected:p.object,received:t.parsedType}),v;const n=this.discriminator,a=t.data[n],s=this.optionsMap.get(a);return s?t.common.async?s._parseAsync({data:t.data,path:t.path,parent:t}):s._parseSync({data:t.data,path:t.path,parent:t}):(f(t,{code:u.invalid_union_discriminator,options:Array.from(this.optionsMap.keys()),path:[n]}),v)}get discriminator(){return this._def.discriminator}get options(){return this._def.options}get optionsMap(){return this._def.optionsMap}static create(e,t,n){const a=new Map;for(const s of t){const o=M(s.shape[e]);if(!o.length)throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);for(const i of o){if(a.has(i))throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(i)}`);a.set(i,s)}}return new we({typeName:g.ZodDiscriminatedUnion,discriminator:e,options:t,optionsMap:a,...y(n)})}}function Re(r,e){const t=P(r),n=P(e);if(r===e)return{valid:!0,data:r};if(t===p.object&&n===p.object){const a=b.objectKeys(e),s=b.objectKeys(r).filter(i=>a.indexOf(i)!==-1),o={...r,...e};for(const i of s){const d=Re(r[i],e[i]);if(!d.valid)return{valid:!1};o[i]=d.data}return{valid:!0,data:o}}else if(t===p.array&&n===p.array){if(r.length!==e.length)return{valid:!1};const a=[];for(let s=0;s<r.length;s++){const o=r[s],i=e[s],d=Re(o,i);if(!d.valid)return{valid:!1};a.push(d.data)}return{valid:!0,data:a}}else return t===p.date&&n===p.date&&+r==+e?{valid:!0,data:r}:{valid:!1}}class ce extends _{_parse(e){const{status:t,ctx:n}=this._processInputParams(e),a=(s,o)=>{if(Ie(s)||Ie(o))return v;const i=Re(s.value,o.value);return i.valid?((Oe(s)||Oe(o))&&t.dirty(),{status:t.value,value:i.data}):(f(n,{code:u.invalid_intersection_types}),v)};return n.common.async?Promise.all([this._def.left._parseAsync({data:n.data,path:n.path,parent:n}),this._def.right._parseAsync({data:n.data,path:n.path,parent:n})]).then(([s,o])=>a(s,o)):a(this._def.left._parseSync({data:n.data,path:n.path,parent:n}),this._def.right._parseSync({data:n.data,path:n.path,parent:n}))}}ce.create=(r,e,t)=>new ce({left:r,right:e,typeName:g.ZodIntersection,...y(t)});class A extends _{_parse(e){const{status:t,ctx:n}=this._processInputParams(e);if(n.parsedType!==p.array)return f(n,{code:u.invalid_type,expected:p.array,received:n.parsedType}),v;if(n.data.length<this._def.items.length)return f(n,{code:u.too_small,minimum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),v;!this._def.rest&&n.data.length>this._def.items.length&&(f(n,{code:u.too_big,maximum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),t.dirty());const s=[...n.data].map((o,i)=>{const d=this._def.items[i]||this._def.rest;return d?d._parse(new O(n,o,n.path,i)):null}).filter(o=>!!o);return n.common.async?Promise.all(s).then(o=>k.mergeArray(t,o)):k.mergeArray(t,s)}get items(){return this._def.items}rest(e){return new A({...this._def,rest:e})}}A.create=(r,e)=>{if(!Array.isArray(r))throw new Error("You must pass an array of schemas to z.tuple([ ... ])");return new A({items:r,typeName:g.ZodTuple,rest:null,...y(e)})};class de extends _{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){const{status:t,ctx:n}=this._processInputParams(e);if(n.parsedType!==p.object)return f(n,{code:u.invalid_type,expected:p.object,received:n.parsedType}),v;const a=[],s=this._def.keyType,o=this._def.valueType;for(const i in n.data)a.push({key:s._parse(new O(n,i,n.path,i)),value:o._parse(new O(n,n.data[i],n.path,i)),alwaysSet:i in n.data});return n.common.async?k.mergeObjectAsync(t,a):k.mergeObjectSync(t,a)}get element(){return this._def.valueType}static create(e,t,n){return t instanceof _?new de({keyType:e,valueType:t,typeName:g.ZodRecord,...y(n)}):new de({keyType:E.create(),valueType:e,typeName:g.ZodRecord,...y(t)})}}class ke extends _{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){const{status:t,ctx:n}=this._processInputParams(e);if(n.parsedType!==p.map)return f(n,{code:u.invalid_type,expected:p.map,received:n.parsedType}),v;const a=this._def.keyType,s=this._def.valueType,o=[...n.data.entries()].map(([i,d],l)=>({key:a._parse(new O(n,i,n.path,[l,"key"])),value:s._parse(new O(n,d,n.path,[l,"value"]))}));if(n.common.async){const i=new Map;return Promise.resolve().then(async()=>{for(const d of o){const l=await d.key,h=await d.value;if(l.status==="aborted"||h.status==="aborted")return v;(l.status==="dirty"||h.status==="dirty")&&t.dirty(),i.set(l.value,h.value)}return{status:t.value,value:i}})}else{const i=new Map;for(const d of o){const l=d.key,h=d.value;if(l.status==="aborted"||h.status==="aborted")return v;(l.status==="dirty"||h.status==="dirty")&&t.dirty(),i.set(l.value,h.value)}return{status:t.value,value:i}}}}ke.create=(r,e,t)=>new ke({valueType:e,keyType:r,typeName:g.ZodMap,...y(t)});class W extends _{_parse(e){const{status:t,ctx:n}=this._processInputParams(e);if(n.parsedType!==p.set)return f(n,{code:u.invalid_type,expected:p.set,received:n.parsedType}),v;const a=this._def;a.minSize!==null&&n.data.size<a.minSize.value&&(f(n,{code:u.too_small,minimum:a.minSize.value,type:"set",inclusive:!0,exact:!1,message:a.minSize.message}),t.dirty()),a.maxSize!==null&&n.data.size>a.maxSize.value&&(f(n,{code:u.too_big,maximum:a.maxSize.value,type:"set",inclusive:!0,exact:!1,message:a.maxSize.message}),t.dirty());const s=this._def.valueType;function o(d){const l=new Set;for(const h of d){if(h.status==="aborted")return v;h.status==="dirty"&&t.dirty(),l.add(h.value)}return{status:t.value,value:l}}const i=[...n.data.values()].map((d,l)=>s._parse(new O(n,d,n.path,l)));return n.common.async?Promise.all(i).then(d=>o(d)):o(i)}min(e,t){return new W({...this._def,minSize:{value:e,message:m.toString(t)}})}max(e,t){return new W({...this._def,maxSize:{value:e,message:m.toString(t)}})}size(e,t){return this.min(e,t).max(e,t)}nonempty(e){return this.min(1,e)}}W.create=(r,e)=>new W({valueType:r,minSize:null,maxSize:null,typeName:g.ZodSet,...y(e)});class X extends _{constructor(){super(...arguments),this.validate=this.implement}_parse(e){const{ctx:t}=this._processInputParams(e);if(t.parsedType!==p.function)return f(t,{code:u.invalid_type,expected:p.function,received:t.parsedType}),v;function n(i,d){return ye({data:i,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,ve(),G].filter(l=>!!l),issueData:{code:u.invalid_arguments,argumentsError:d}})}function a(i,d){return ye({data:i,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,ve(),G].filter(l=>!!l),issueData:{code:u.invalid_return_type,returnTypeError:d}})}const s={errorMap:t.common.contextualErrorMap},o=t.data;if(this._def.returns instanceof F){const i=this;return T(async function(...d){const l=new S([]),h=await i._def.args.parseAsync(d,s).catch(B=>{throw l.addIssue(n(d,B)),l}),w=await Reflect.apply(o,this,h);return await i._def.returns._def.type.parseAsync(w,s).catch(B=>{throw l.addIssue(a(w,B)),l})})}else{const i=this;return T(function(...d){const l=i._def.args.safeParse(d,s);if(!l.success)throw new S([n(d,l.error)]);const h=Reflect.apply(o,this,l.data),w=i._def.returns.safeParse(h,s);if(!w.success)throw new S([a(h,w.error)]);return w.data})}}parameters(){return this._def.args}returnType(){return this._def.returns}args(...e){return new X({...this._def,args:A.create(e).rest(q.create())})}returns(e){return new X({...this._def,returns:e})}implement(e){return this.parse(e)}strictImplement(e){return this.parse(e)}static create(e,t,n){return new X({args:e||A.create([]).rest(q.create()),returns:t||q.create(),typeName:g.ZodFunction,...y(n)})}}class ue extends _{get schema(){return this._def.getter()}_parse(e){const{ctx:t}=this._processInputParams(e);return this._def.getter()._parse({data:t.data,path:t.path,parent:t})}}ue.create=(r,e)=>new ue({getter:r,typeName:g.ZodLazy,...y(e)});class le extends _{_parse(e){if(e.data!==this._def.value){const t=this._getOrReturnCtx(e);return f(t,{received:t.data,code:u.invalid_literal,expected:this._def.value}),v}return{status:"valid",value:e.data}}get value(){return this._def.value}}le.create=(r,e)=>new le({value:r,typeName:g.ZodLiteral,...y(e)});function ze(r,e){return new V({values:r,typeName:g.ZodEnum,...y(e)})}class V extends _{constructor(){super(...arguments),re.set(this,void 0)}_parse(e){if(typeof e.data!="string"){const t=this._getOrReturnCtx(e),n=this._def.values;return f(t,{expected:b.joinValues(n),received:t.parsedType,code:u.invalid_type}),v}if(_e(this,re)||De(this,re,new Set(this._def.values)),!_e(this,re).has(e.data)){const t=this._getOrReturnCtx(e),n=this._def.values;return f(t,{received:t.data,code:u.invalid_enum_value,options:n}),v}return T(e.data)}get options(){return this._def.values}get enum(){const e={};for(const t of this._def.values)e[t]=t;return e}get Values(){const e={};for(const t of this._def.values)e[t]=t;return e}get Enum(){const e={};for(const t of this._def.values)e[t]=t;return e}extract(e,t=this._def){return V.create(e,{...this._def,...t})}exclude(e,t=this._def){return V.create(this.options.filter(n=>!e.includes(n)),{...this._def,...t})}}re=new WeakMap,V.create=ze;class fe extends _{constructor(){super(...arguments),ne.set(this,void 0)}_parse(e){const t=b.getValidEnumValues(this._def.values),n=this._getOrReturnCtx(e);if(n.parsedType!==p.string&&n.parsedType!==p.number){const a=b.objectValues(t);return f(n,{expected:b.joinValues(a),received:n.parsedType,code:u.invalid_type}),v}if(_e(this,ne)||De(this,ne,new Set(b.getValidEnumValues(this._def.values))),!_e(this,ne).has(e.data)){const a=b.objectValues(t);return f(n,{received:n.data,code:u.invalid_enum_value,options:a}),v}return T(e.data)}get enum(){return this._def.values}}ne=new WeakMap,fe.create=(r,e)=>new fe({values:r,typeName:g.ZodNativeEnum,...y(e)});class F extends _{unwrap(){return this._def.type}_parse(e){const{ctx:t}=this._processInputParams(e);if(t.parsedType!==p.promise&&t.common.async===!1)return f(t,{code:u.invalid_type,expected:p.promise,received:t.parsedType}),v;const n=t.parsedType===p.promise?t.data:Promise.resolve(t.data);return T(n.then(a=>this._def.type.parseAsync(a,{path:t.path,errorMap:t.common.contextualErrorMap})))}}F.create=(r,e)=>new F({type:r,typeName:g.ZodPromise,...y(e)});class C extends _{innerType(){return this._def.schema}sourceType(){return this._def.schema._def.typeName===g.ZodEffects?this._def.schema.sourceType():this._def.schema}_parse(e){const{status:t,ctx:n}=this._processInputParams(e),a=this._def.effect||null,s={addIssue:o=>{f(n,o),o.fatal?t.abort():t.dirty()},get path(){return n.path}};if(s.addIssue=s.addIssue.bind(s),a.type==="preprocess"){const o=a.transform(n.data,s);if(n.common.async)return Promise.resolve(o).then(async i=>{if(t.value==="aborted")return v;const d=await this._def.schema._parseAsync({data:i,path:n.path,parent:n});return d.status==="aborted"?v:d.status==="dirty"||t.value==="dirty"?J(d.value):d});{if(t.value==="aborted")return v;const i=this._def.schema._parseSync({data:o,path:n.path,parent:n});return i.status==="aborted"?v:i.status==="dirty"||t.value==="dirty"?J(i.value):i}}if(a.type==="refinement"){const o=i=>{const d=a.refinement(i,s);if(n.common.async)return Promise.resolve(d);if(d instanceof Promise)throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");return i};if(n.common.async===!1){const i=this._def.schema._parseSync({data:n.data,path:n.path,parent:n});return i.status==="aborted"?v:(i.status==="dirty"&&t.dirty(),o(i.value),{status:t.value,value:i.value})}else return this._def.schema._parseAsync({data:n.data,path:n.path,parent:n}).then(i=>i.status==="aborted"?v:(i.status==="dirty"&&t.dirty(),o(i.value).then(()=>({status:t.value,value:i.value}))))}if(a.type==="transform")if(n.common.async===!1){const o=this._def.schema._parseSync({data:n.data,path:n.path,parent:n});if(!ee(o))return o;const i=a.transform(o.value,s);if(i instanceof Promise)throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");return{status:t.value,value:i}}else return this._def.schema._parseAsync({data:n.data,path:n.path,parent:n}).then(o=>ee(o)?Promise.resolve(a.transform(o.value,s)).then(i=>({status:t.value,value:i})):o);b.assertNever(a)}}C.create=(r,e,t)=>new C({schema:r,typeName:g.ZodEffects,effect:e,...y(t)}),C.createWithPreprocess=(r,e,t)=>new C({schema:e,effect:{type:"preprocess",transform:r},typeName:g.ZodEffects,...y(t)});class R extends _{_parse(e){return this._getType(e)===p.undefined?T(void 0):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}}R.create=(r,e)=>new R({innerType:r,typeName:g.ZodOptional,...y(e)});class L extends _{_parse(e){return this._getType(e)===p.null?T(null):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}}L.create=(r,e)=>new L({innerType:r,typeName:g.ZodNullable,...y(e)});class he extends _{_parse(e){const{ctx:t}=this._processInputParams(e);let n=t.data;return t.parsedType===p.undefined&&(n=this._def.defaultValue()),this._def.innerType._parse({data:n,path:t.path,parent:t})}removeDefault(){return this._def.innerType}}he.create=(r,e)=>new he({innerType:r,typeName:g.ZodDefault,defaultValue:typeof e.default=="function"?e.default:()=>e.default,...y(e)});class pe extends _{_parse(e){const{ctx:t}=this._processInputParams(e),n={...t,common:{...t.common,issues:[]}},a=this._def.innerType._parse({data:n.data,path:n.path,parent:{...n}});return te(a)?a.then(s=>({status:"valid",value:s.status==="valid"?s.value:this._def.catchValue({get error(){return new S(n.common.issues)},input:n.data})})):{status:"valid",value:a.status==="valid"?a.value:this._def.catchValue({get error(){return new S(n.common.issues)},input:n.data})}}removeCatch(){return this._def.innerType}}pe.create=(r,e)=>new pe({innerType:r,typeName:g.ZodCatch,catchValue:typeof e.catch=="function"?e.catch:()=>e.catch,...y(e)});class Te extends _{_parse(e){if(this._getType(e)!==p.nan){const n=this._getOrReturnCtx(e);return f(n,{code:u.invalid_type,expected:p.nan,received:n.parsedType}),v}return{status:"valid",value:e.data}}}Te.create=r=>new Te({typeName:g.ZodNaN,...y(r)});const gt=Symbol("zod_brand");class Ze extends _{_parse(e){const{ctx:t}=this._processInputParams(e),n=t.data;return this._def.type._parse({data:n,path:t.path,parent:t})}unwrap(){return this._def.type}}class me extends _{_parse(e){const{status:t,ctx:n}=this._processInputParams(e);if(n.common.async)return(async()=>{const s=await this._def.in._parseAsync({data:n.data,path:n.path,parent:n});return s.status==="aborted"?v:s.status==="dirty"?(t.dirty(),J(s.value)):this._def.out._parseAsync({data:s.value,path:n.path,parent:n})})();{const a=this._def.in._parseSync({data:n.data,path:n.path,parent:n});return a.status==="aborted"?v:a.status==="dirty"?(t.dirty(),{status:"dirty",value:a.value}):this._def.out._parseSync({data:a.value,path:n.path,parent:n})}}static create(e,t){return new me({in:e,out:t,typeName:g.ZodPipeline})}}class ge extends _{_parse(e){const t=this._def.innerType._parse(e),n=a=>(ee(a)&&(a.value=Object.freeze(a.value)),a);return te(t)?t.then(a=>n(a)):n(t)}unwrap(){return this._def.innerType}}ge.create=(r,e)=>new ge({innerType:r,typeName:g.ZodReadonly,...y(e)});function qe(r,e={},t){return r?Y.create().superRefine((n,a)=>{var s,o;if(!r(n)){const i=typeof e=="function"?e(n):typeof e=="string"?{message:e}:e,d=(o=(s=i.fatal)!==null&&s!==void 0?s:t)!==null&&o!==void 0?o:!0,l=typeof i=="string"?{message:i}:i;a.addIssue({code:"custom",...l,fatal:d})}}):Y.create()}const vt={object:x.lazycreate};var g;(function(r){r.ZodString="ZodString",r.ZodNumber="ZodNumber",r.ZodNaN="ZodNaN",r.ZodBigInt="ZodBigInt",r.ZodBoolean="ZodBoolean",r.ZodDate="ZodDate",r.ZodSymbol="ZodSymbol",r.ZodUndefined="ZodUndefined",r.ZodNull="ZodNull",r.ZodAny="ZodAny",r.ZodUnknown="ZodUnknown",r.ZodNever="ZodNever",r.ZodVoid="ZodVoid",r.ZodArray="ZodArray",r.ZodObject="ZodObject",r.ZodUnion="ZodUnion",r.ZodDiscriminatedUnion="ZodDiscriminatedUnion",r.ZodIntersection="ZodIntersection",r.ZodTuple="ZodTuple",r.ZodRecord="ZodRecord",r.ZodMap="ZodMap",r.ZodSet="ZodSet",r.ZodFunction="ZodFunction",r.ZodLazy="ZodLazy",r.ZodLiteral="ZodLiteral",r.ZodEnum="ZodEnum",r.ZodEffects="ZodEffects",r.ZodNativeEnum="ZodNativeEnum",r.ZodOptional="ZodOptional",r.ZodNullable="ZodNullable",r.ZodDefault="ZodDefault",r.ZodCatch="ZodCatch",r.ZodPromise="ZodPromise",r.ZodBranded="ZodBranded",r.ZodPipeline="ZodPipeline",r.ZodReadonly="ZodReadonly"})(g||(g={}));const yt=(r,e={message:`Input not instance of ${r.name}`})=>qe(t=>t instanceof r,e),We=E.create,He=$.create,_t=Te.create,bt=D.create,Ge=ae.create,xt=z.create,wt=be.create,kt=se.create,Tt=ie.create,St=Y.create,Et=q.create,Nt=j.create,Ct=xe.create,It=N.create,Ot=x.create,At=x.strictCreate,Rt=oe.create,Zt=we.create,jt=ce.create,Mt=A.create,Pt=de.create,$t=ke.create,Dt=W.create,Vt=X.create,Lt=ue.create,Ut=le.create,Bt=V.create,zt=fe.create,qt=F.create,Je=C.create,Wt=R.create,Ht=L.create,Gt=C.createWithPreprocess,Jt=me.create;var c=Object.freeze({__proto__:null,defaultErrorMap:G,setErrorMap:Qe,getErrorMap:ve,makeIssue:ye,EMPTY_PATH:et,addIssueToContext:f,ParseStatus:k,INVALID:v,DIRTY:J,OK:T,isAborted:Ie,isDirty:Oe,isValid:ee,isAsync:te,get util(){return b},get objectUtil(){return Ce},ZodParsedType:p,getParsedType:P,ZodType:_,datetimeRegex:Be,ZodString:E,ZodNumber:$,ZodBigInt:D,ZodBoolean:ae,ZodDate:z,ZodSymbol:be,ZodUndefined:se,ZodNull:ie,ZodAny:Y,ZodUnknown:q,ZodNever:j,ZodVoid:xe,ZodArray:N,ZodObject:x,ZodUnion:oe,ZodDiscriminatedUnion:we,ZodIntersection:ce,ZodTuple:A,ZodRecord:de,ZodMap:ke,ZodSet:W,ZodFunction:X,ZodLazy:ue,ZodLiteral:le,ZodEnum:V,ZodNativeEnum:fe,ZodPromise:F,ZodEffects:C,ZodTransformer:C,ZodOptional:R,ZodNullable:L,ZodDefault:he,ZodCatch:pe,ZodNaN:Te,BRAND:gt,ZodBranded:Ze,ZodPipeline:me,ZodReadonly:ge,custom:qe,Schema:_,ZodSchema:_,late:vt,get ZodFirstPartyTypeKind(){return g},coerce:{string:(r=>E.create({...r,coerce:!0})),number:(r=>$.create({...r,coerce:!0})),boolean:(r=>ae.create({...r,coerce:!0})),bigint:(r=>D.create({...r,coerce:!0})),date:(r=>z.create({...r,coerce:!0}))},any:St,array:It,bigint:bt,boolean:Ge,date:xt,discriminatedUnion:Zt,effect:Je,enum:Bt,function:Vt,instanceof:yt,intersection:jt,lazy:Lt,literal:Ut,map:$t,nan:_t,nativeEnum:zt,never:Nt,null:Tt,nullable:Ht,number:He,object:Ot,oboolean:()=>Ge().optional(),onumber:()=>He().optional(),optional:Wt,ostring:()=>We().optional(),pipeline:Jt,preprocess:Gt,promise:qt,record:Pt,set:Dt,strictObject:At,string:We,symbol:wt,transformer:Je,tuple:Mt,undefined:kt,union:Rt,unknown:Et,void:Ct,NEVER:v,ZodIssueCode:u,quotelessJson:Fe,ZodError:S});

// WebDNA v1.0.0 — Contracts, Normalization, Storage & MV3 Coordinator
const Yt = c.enum(["observed", "derived", "inferred"]);
const je = c.enum(["complete", "partial", "skipped", "failed"]);
const Kt = c.enum(["color", "font", "spacing", "radius", "shadow"]);
const Xt = c.object({
  id: c.string().min(1).max(200),
  category: Kt,
  name: c.string().min(1).max(200),
  value: c.string().min(1).max(500),
  role: c.string().max(100).optional(),
  hex: c.string().max(30).optional(),
  frequency: c.number().int().nonnegative(),
  evidence: Yt
});
const Ft = c.object({
  status: je,
  data: c.unknown(),
  warnings: c.array(c.string().max(500)),
  sampledNodes: c.number().int().nonnegative(),
  elapsedMs: c.number().nonnegative()
});
const Qt = c.object({
  origin: c.string().max(500),
  path: c.string().max(1000)
});
const AssetItemSchema = c.object({
  id: c.string().max(120).optional(),
  kind: c.enum(["img", "svg", "source", "video", "link", "background", "font", "icon", "model"]),
  url: Qt,
  origPath: c.string().max(400).optional(),
  downloadUrl: c.string().max(500000).optional(),
  svgContent: c.string().max(200000).optional(),
  fileName: c.string().max(150).optional(),
  ext: c.string().max(20).optional(),
  mime: c.string().max(100).optional(),
  label: c.string().max(150).optional(),
  width: c.number().nonnegative().optional(),
  height: c.number().nonnegative().optional()
});
const er = c.object({
  scanId: c.string().min(1),
  sourceOrigin: c.string().max(500),
  sourcePath: c.string().max(1000),
  viewport: c.object({
    w: c.number().int().positive(),
    h: c.number().int().positive()
  }),
  nodeCount: c.number().int().nonnegative(),
  truncated: c.boolean(),
  sampled: c.boolean(),
  nodes: c.array(c.object({
    tag: c.string().max(50),
    role: c.string().max(100).optional(),
    depth: c.number().int().nonnegative(),
    classes: c.array(c.string().max(100)).max(20),
    rect: c.object({ x: c.number(), y: c.number(), w: c.number(), h: c.number() }),
    display: c.string().max(100),
    visible: c.boolean()
  })).max(25000),
  colors: c.array(c.object({
    value: c.string().max(100),
    count: c.number().int().nonnegative(),
    kind: c.enum(["color", "background", "border"])
  })).max(500),
  fonts: c.array(c.object({
    family: c.string().max(300),
    size: c.string().max(50),
    weight: c.string().max(50),
    lineHeight: c.string().max(50),
    letterSpacing: c.string().max(50).optional(),
    level: c.string().max(40).optional(),
    count: c.number().int().nonnegative()
  })).max(500),
  spacing: c.array(c.object({
    kind: c.enum(["padding", "margin", "gap"]),
    value: c.string().max(100),
    count: c.number().int().nonnegative()
  })).max(500),
  radii: c.array(c.object({
    value: c.string().max(100),
    count: c.number().int().nonnegative()
  })).max(200).optional(),
  shadows: c.array(c.object({
    value: c.string().max(200),
    count: c.number().int().nonnegative()
  })).max(200).optional(),
  gradients: c.array(c.string().max(350)).max(100).optional(),
  layout: c.object({
    flexCount: c.number().int().nonnegative(),
    gridCount: c.number().int().nonnegative(),
    blockCount: c.number().int().nonnegative(),
    maxDepth: c.number().int().nonnegative(),
    flexGaps: c.array(c.string().max(100)).max(100),
    gridTemplates: c.array(c.string().max(300)).max(100)
  }),
  cssVariables: c.array(c.object({
    name: c.string().max(200),
    value: c.string().max(500)
  })).max(1000),
  cssVariableStatus: je,
  assets: c.array(AssetItemSchema).max(2000),
  animations: c.array(c.object({
    name: c.string().max(200),
    duration: c.string().max(100),
    timing: c.string().max(100),
    count: c.number().int().nonnegative()
  })).max(200),
  keyframes: c.array(c.unknown()).optional(),
  stylesheets: c.array(c.unknown()).optional(),
  components: c.array(c.unknown()).optional(),
  backend: c.unknown().optional(),
  topology: c.array(c.unknown()).optional(),
  pageMeta: c.unknown().optional(),
  webglScene: c.unknown().optional(),
  timelines: c.unknown().optional(),
  audioGraph: c.unknown().optional(),
  clientScripts: c.unknown().optional(),
  apiMocks: c.array(c.unknown()).optional(),
  htmlSnapshot: c.string().max(700000).optional(),
  warnings: c.array(c.string().max(500)),
  extractorStatuses: c.record(c.string(), je),
  extractorWarnings: c.record(c.string(), c.array(c.string().max(500))),
  extractorSampled: c.record(c.string(), c.number().int().nonnegative()),
  extractorElapsedMs: c.record(c.string(), c.number().nonnegative()),
  shadowRoots: c.object({
    open: c.number().int().nonnegative(),
    closed: c.number().int().nonnegative()
  }),
  frames: c.object({
    topOnly: c.boolean(),
    iframeCount: c.number().int().nonnegative()
  })
});

const Ye = c.object({
  schemaVersion: c.literal("1.0.0"),
  reportId: c.string().min(1),
  scanId: c.string().min(1),
  createdAt: c.string().datetime(),
  source: c.object({
    origin: c.string().max(500),
    path: c.string().max(1000),
    viewport: c.object({ w: c.number().int().positive(), h: c.number().int().positive() })
  }),
  coverage: c.object({
    visited: c.number().int().nonnegative(),
    sampled: c.boolean(),
    truncated: c.boolean()
  }),
  tokens: c.array(Xt),
  extracts: c.record(c.string(), Ft),
  warnings: c.array(c.string().max(500)),
  status: c.enum(["completed", "partial", "cancelled", "failed", "stale"])
});

const Me = c.object({
  maxNodes: c.number().int().min(100).max(25000).default(10000),
  includeAssets: c.boolean().default(true),
  includeCssVariables: c.boolean().default(true),
  includeClientScripts: c.boolean().default(true)
});

const tr = c.enum(["idle", "queued", "running", "completed", "partial", "failed", "cancelled", "stale"]);
const rr = c.object({
  scanId: c.string().min(1),
  requestId: c.string().min(1),
  tabId: c.number().int().nonnegative(),
  url: c.string().max(2000),
  origin: c.string().max(500),
  status: tr,
  progress: c.number().min(0).max(100),
  errorCode: c.string().max(100).optional(),
  errorMessage: c.string().max(1000).optional(),
  reportId: c.string().optional(),
  startedAt: c.number(),
  updatedAt: c.number(),
  chunksReceived: c.number().int().nonnegative(),
  chunksExpected: c.number().int().nonnegative().optional()
});

const nr = c.enum([
  "UNSUPPORTED_PAGE",
  "PERMISSION_DENIED",
  "CROSS_ORIGIN_BLOCKED",
  "CAPTURE_TIMEOUT",
  "TAB_NAVIGATED",
  "QUOTA_EXCEEDED",
  "SCHEMA_MISMATCH",
  "SCAN_IN_PROGRESS",
  "NO_ACTIVE_TAB",
  "PROBE_FAILED",
  "UNKNOWN"
]);

const ar = c.object({
  protocol: c.literal(1),
  requestId: c.string().min(1),
  scanId: c.string().optional(),
  type: c.enum([
    "PROBE_READY",
    "SCAN_START",
    "SCAN_CANCEL",
    "SCAN_PROGRESS",
    "SCAN_CHUNK",
    "SCAN_FINISHED",
    "SCAN_FAILED",
    "REPORT_GET",
    "REPORT_EXPORT",
    "HEARTBEAT",
    "JOB_GET",
    "HISTORY_LIST",
    "HISTORY_DELETE",
    "SETTINGS_GET",
    "SETTINGS_SET",
    "INSPECT_START",
    "INSPECT_CANCEL",
    "INSPECT_RESULT",
    "INSPECT_GET",
    "ASSET_FETCH_ONE"
  ]),
  createdAt: c.number(),
  payload: c.unknown()
});

const sr = c.object({
  seq: c.number().int().nonnegative(),
  totalChunks: c.number().int().positive(),
  kind: c.enum(["census", "final"]),
  nodes: c.array(c.unknown()).optional(),
  snapshot: c.unknown().optional()
});

const or = new Set([
  "chrome", "chrome-extension", "edge", "about", "brave",
  "opera", "moz-extension", "view-source", "data", "blob", "javascript", "file"
]);

function cr(r) {
  if (!r) return { supported: false, code: "NO_ACTIVE_TAB", message: "No active tab found. Open a regular web page and try again." };
  let e;
  try { e = new URL(r); } catch {
    return { supported: false, code: "UNSUPPORTED_PAGE", message: "This page URL cannot be scanned. Open a regular http(s) web page." };
  }
  const t = e.protocol.replace(":", "");
  if (or.has(t)) {
    return {
      supported: false,
      code: "UNSUPPORTED_PAGE",
      message: `WebDNA cannot scan ${t}:// pages (browser internal pages are restricted). Open a regular http(s) web page and try again.`
    };
  }
  if (t !== "http" && t !== "https") {
    return { supported: false, code: "UNSUPPORTED_PAGE", message: "Only http(s) pages can be scanned." };
  }
  return { supported: true };
}

function balanceCssParentheses(rawVal, maxLen = 450) {
  if (!rawVal || typeof rawVal !== "string") return "";
  let v = rawVal.trim().slice(0, maxLen).replace(/[,;\s]+$/, "");
  let openParens = 0, inSingle = false, inDouble = false;
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
  while (openParens > 0) { v += ")"; openParens--; }
  return v;
}

function dr(r) {
  const e = balanceCssParentheses(String(r || "").trim(), 450).toLowerCase();
  if (/^(oklab|oklch|color|lab|lch)\(/i.test(e)) return e;
  if (!e) return null;
  if (e === "transparent") return "rgba(0, 0, 0, 0)";
  const t = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(e);
  if (t) {
    let o = t[1];
    if (o.length === 3 || o.length === 4) o = o.split("").map((w) => w + w).join("");
    const i = parseInt(o.slice(0, 2), 16);
    const d = parseInt(o.slice(2, 4), 16);
    const l = parseInt(o.slice(4, 6), 16);
    let h = 1;
    if (o.length === 8) h = Math.round((parseInt(o.slice(6, 8), 16) / 255) * 1000) / 1000;
    return `rgba(${i}, ${d}, ${l}, ${h})`;
  }
  const n = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*([0-9.]+))?\s*\)$/.exec(e);
  if (n) {
    const o = Math.min(255, parseInt(n[1], 10));
    const i = Math.min(255, parseInt(n[2], 10));
    const d = Math.min(255, parseInt(n[3], 10));
    const l = n[4] === undefined ? 1 : Math.min(1, Math.max(0, parseFloat(n[4])));
    return `rgba(${o}, ${i}, ${d}, ${l})`;
  }
  const a = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%(?:\s*,\s*([0-9.]+))?\s*\)$/.exec(e);
  if (a) {
    const o = parseInt(a[1], 10) / 360;
    const i = parseInt(a[2], 10) / 100;
    const d = parseInt(a[3], 10) / 100;
    const l = a[4] === undefined ? 1 : parseFloat(a[4]);
    const [h, w, U] = ur(o, i, d);
    return `rgba(${h}, ${w}, ${U}, ${l})`;
  }
  return {
    black: "rgba(0, 0, 0, 1)",
    white: "rgba(255, 255, 255, 1)",
    red: "rgba(255, 0, 0, 1)",
    green: "rgba(0, 128, 0, 1)",
    blue: "rgba(0, 0, 255, 1)"
  }[e] ?? e;
}

function ur(r, e, t) {
  const n = t < 0.5 ? t * (1 + e) : t + e - t * e;
  const a = 2 * t - n;
  const s = (o) => {
    let i = o;
    if (i < 0) i += 1;
    if (i > 1) i -= 1;
    if (i < 1 / 6) return a + (n - a) * 6 * i;
    if (i < 1 / 2) return n;
    if (i < 2 / 3) return a + (n - a) * (2 / 3 - i) * 6;
    return a;
  };
  return [
    Math.round(s(r + 1 / 3) * 255),
    Math.round(s(r) * 255),
    Math.round(s(r - 1 / 3) * 255)
  ];
}

function rgbaToHex(rgbaStr) {
  const m = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([0-9.]+))?\s*\)/.exec(rgbaStr);
  if (!m) return rgbaStr.slice(0, 30);
  const r = parseInt(m[1], 10).toString(16).padStart(2, "0");
  const g = parseInt(m[2], 10).toString(16).padStart(2, "0");
  const b = parseInt(m[3], 10).toString(16).padStart(2, "0");
  const a = m[4] !== undefined ? parseFloat(m[4]) : 1;
  if (a < 1) {
    const alphaHex = Math.round(a * 255).toString(16).padStart(2, "0");
    return `#${r}${g}${b}${alphaHex}`.toUpperCase();
  }
  return `#${r}${g}${b}`.toUpperCase();
}

function inferColorRole(rgbaStr, kindMap, idx) {
  const m = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([0-9.]+))?\s*\)/.exec(rgbaStr);
  if (!m) return "accent";
  const r = parseInt(m[1], 10), g = parseInt(m[2], 10), b = parseInt(m[3], 10);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const maxC = Math.max(r, g, b), minC = Math.min(r, g, b);
  const sat = maxC === 0 ? 0 : (maxC - minC) / maxC;
  const bgCount = kindMap.background || 0;
  const textCount = kindMap.color || 0;
  const borderCount = kindMap.border || 0;
  if (sat > 0.35 && lum > 0.15 && lum < 0.88) return idx < 4 ? "brand-primary" : "brand-accent";
  if (bgCount >= textCount && bgCount >= borderCount) {
    return lum > 0.85 ? "surface-light" : lum < 0.2 ? "surface-dark" : "surface-muted";
  }
  if (borderCount > textCount && borderCount > bgCount) return "border-subtle";
  return lum < 0.25 ? "text-primary" : lum > 0.85 ? "text-inverse" : "text-secondary";
}

function lr(r) {
  return (r.split(",")[0]?.trim() ?? "").replace(/^["']|["']$/g, "").trim();
}

function fr(r) {
  const e = [];
  const t = new Map();
  const colorKinds = new Map();
  for (const o of r.colors) {
    const i = dr(o.value);
      if (!i || typeof i !== "string" || i === "rgba(0, 0, 0, 0)") continue;
    const clampedColor = i.slice(0, 500);
    if (!clampedColor) continue;
    t.set(clampedColor, (t.get(clampedColor) ?? 0) + o.count);
    const km = colorKinds.get(clampedColor) || { color: 0, background: 0, border: 0 };
    km[o.kind] = (km[o.kind] || 0) + o.count;
    colorKinds.set(clampedColor, km);
  }
  [...t.entries()].sort((o, i) => i[1] - o[1]).slice(0, 50).forEach(([o, i], d) => {
    const km = colorKinds.get(o) || {};
    e.push({
      id: `color-${d + 1}`,
      category: "color",
      name: `color-${String(d + 1).padStart(2, "0")}`,
      value: o,
      hex: rgbaToHex(o),
      role: inferColorRole(o, km, d),
      frequency: i,
      evidence: "derived"
    });
  });

  const a = new Map();
  for (const o of r.fonts) {
    const i = lr(o.family);
    if (i) a.set(i, (a.get(i) ?? 0) + o.count);
  }
  [...a.entries()].sort((o, i) => i[1] - o[1]).slice(0, 30).forEach(([o, i], d) => {
    e.push({
      id: `font-${d + 1}`,
      category: "font",
      name: `font-${String(d + 1).padStart(2, "0")}`,
      value: o,
      role: d === 0 ? "font-sans-primary" : d === 1 ? "font-heading" : "font-accent",
      frequency: i,
      evidence: "derived"
    });
  });

  const s = new Map();
  for (const o of r.spacing) s.set(o.value, (s.get(o.value) ?? 0) + o.count);
  [...s.entries()].sort((o, i) => i[1] - o[1]).slice(0, 30).forEach(([o, i], d) => {
    e.push({
      id: `spacing-${d + 1}`,
      category: "spacing",
      name: `spacing-${String(d + 1).padStart(2, "0")}`,
      value: balanceCssParentheses(o, 450).slice(0, 500),
      frequency: i,
      evidence: "derived"
    });
  });

  if (Array.isArray(r.radii)) {
    r.radii.slice(0, 15).forEach((o, d) => {
      e.push({
        id: `radius-${d + 1}`,
        category: "radius",
        name: `radius-${String(d + 1).padStart(2, "0")}`,
        value: balanceCssParentheses(o.value, 450).slice(0, 500),
        frequency: o.count,
        evidence: "observed"
      });
    });
  }

  if (Array.isArray(r.shadows)) {
    r.shadows.slice(0, 15).forEach((o, d) => {
      e.push({
        id: `shadow-${d + 1}`,
        category: "shadow",
        name: `shadow-${String(d + 1).padStart(2, "0")}`,
        value: balanceCssParentheses(o.value, 450).slice(0, 500),
        frequency: o.count,
        evidence: "observed"
      });
    });
  }

  return e;
}

function hr(r, e) {
  const t = (h) => r.extractorStatuses[h] ?? "complete";
  const n = (h) => r.extractorWarnings[h] ?? [];
  const a = (h) => r.extractorSampled[h] ?? r.nodeCount;
  const s = (h) => r.extractorElapsedMs[h] ?? 1;
  const o = {
    dom: {
      status: t("dom"),
      data: {
        nodeCount: r.nodeCount,
        truncated: r.truncated,
        sampled: r.sampled,
        maxDepth: r.layout.maxDepth,
        shadowRoots: r.shadowRoots,
        frames: r.frames,
        nodes: r.nodes.slice(0, 250)
      },
      warnings: n("dom"),
      sampledNodes: a("dom"),
      elapsedMs: s("dom")
    },
    colors: {
      status: t("colors"),
      data: r.colors,
      warnings: n("colors"),
      sampledNodes: a("colors"),
      elapsedMs: s("colors")
    },
    typography: {
      status: t("typography"),
      data: r.fonts,
      warnings: n("typography"),
      sampledNodes: a("typography"),
      elapsedMs: s("typography")
    },
    spacing: {
      status: t("spacing"),
      data: r.spacing,
      warnings: n("spacing"),
      sampledNodes: a("spacing"),
      elapsedMs: s("spacing")
    },
    layout: {
      status: t("layout"),
      data: {
        ...r.layout,
        gradients: r.gradients || [],
        radii: r.radii || [],
        shadows: r.shadows || []
      },
      warnings: n("layout"),
      sampledNodes: a("layout"),
      elapsedMs: s("layout")
    },
    cssVariables: {
      status: r.cssVariableStatus,
      data: r.cssVariables,
      warnings: n("cssVariables"),
      sampledNodes: a("cssVariables"),
      elapsedMs: s("cssVariables")
    },
    assets: {
      status: t("assets"),
      data: r.assets,
      warnings: n("assets"),
      sampledNodes: a("assets"),
      elapsedMs: s("assets")
    },
    animations: {
      status: t("animations"),
      data: r.animations,
      warnings: n("animations"),
      sampledNodes: a("animations"),
      elapsedMs: s("animations")
    },
    components: {
      status: t("components"),
      data: {
        components: r.components || [],
        backend: r.backend || { models: [], endpoints: [], authPatterns: [] },
        topology: r.topology || [],
        keyframes: r.keyframes || [],
        stylesheets: r.stylesheets || [],
        webglScene: r.webglScene || null,
        timelines: r.timelines || null,
        audioGraph: r.audioGraph || null,
        pageMeta: r.pageMeta || null,
        clientScripts: r.clientScripts || null,
        apiMocks: r.apiMocks || [],
        htmlSnapshot: r.htmlSnapshot || ""
      },
      warnings: n("components"),
      sampledNodes: a("components"),
      elapsedMs: s("components")
    },
    runtime: {
      status: t("runtime"),
      data: {
        webglScene: r.webglScene || null,
        timelines: r.timelines || null,
        audioGraph: r.audioGraph || null,
        pageMeta: r.pageMeta || null,
        clientScripts: r.clientScripts || null,
        apiMocks: r.apiMocks || [],
        stylesheets: r.stylesheets || [],
        keyframes: r.keyframes || []
      },
      warnings: n("runtime"),
      sampledNodes: a("runtime"),
      elapsedMs: s("runtime")
    }
  };
  const i = Object.values(o).some((h) => h.status === "failed");
  const d = Object.values(o).some((h) => h.status === "partial");
  const l = i || d || r.truncated ? "partial" : "completed";
  return {
    schemaVersion: "1.0.0",
    reportId: e.reportId,
    scanId: r.scanId,
    createdAt: new Date().toISOString(),
    source: { origin: r.sourceOrigin, path: r.sourcePath, viewport: r.viewport },
    coverage: { visited: r.nodeCount, sampled: r.sampled, truncated: r.truncated },
    tokens: fr(r),
    extracts: o,
    warnings: r.warnings,
    status: l
  };
}

const pr = "webdna", mr = 1;
function gr() {
  return new Promise((r, e) => {
    const t = indexedDB.open(pr, mr);
    t.onupgradeneeded = () => {
      const n = t.result;
      if (!n.objectStoreNames.contains("reports")) n.createObjectStore("reports", { keyPath: "reportId" });
      if (!n.objectStoreNames.contains("meta")) n.createObjectStore("meta", { keyPath: "reportId" });
    };
    t.onsuccess = () => r(t.result);
    t.onerror = () => e(t.error);
  });
}

function Q(r, e, t) {
  return gr().then((n) => new Promise((a, s) => {
    const o = n.transaction(r, e);
    const i = t(o.objectStore(r));
    i.onsuccess = () => { a(i.result); n.close(); };
    i.onerror = () => { s(i.error); n.close(); };
    o.onabort = () => { s(o.error); n.close(); };
  }));
}

async function vr(r) {
  const e = {
    reportId: r.reportId,
    scanId: r.scanId,
    origin: r.source.origin,
    path: r.source.path,
    createdAt: r.createdAt,
    status: r.status,
    nodeCount: r.coverage.visited
  };
  await Q("reports", "readwrite", (t) => t.put(r));
  await Q("meta", "readwrite", (t) => t.put(e));
}

async function yr(r) { return Q("reports", "readonly", (e) => e.get(r)); }
async function _r() {
  return ((await Q("meta", "readonly", (e) => e.getAll())) ?? []).sort((e, t) => (e.createdAt < t.createdAt ? 1 : -1));
}
async function br(r) {
  await Q("reports", "readwrite", (e) => e.delete(r));
  await Q("meta", "readwrite", (e) => e.delete(r));
}

const Ke = (r) => `webdna:job:${r}`;
const Se = (r) => `webdna:chunks:${r}`;
async function Z(r) { return (await chrome.storage.session.get(r))[r]; }
async function Ee(r, e) { await chrome.storage.session.set({ [r]: e }); }
async function H(r) { await chrome.storage.session.remove(r); }
async function I(r) {
  const e = { ...r, updatedAt: Date.now() };
  await Ee(Ke(r.scanId), e);
  await Ee("webdna:currentJob", e);
}
async function xr(r) {
  try { await chrome.runtime.sendMessage(r); } catch {}
}

async function wr(r, e) {
  const t = await Z("webdna:currentJob");
  if (t && (t.status === "queued" || t.status === "running")) {
    const ageMs = Date.now() - (t.updatedAt || t.startedAt || 0);
    if (ageMs > 15000) {
      console.warn("Auto-clearing stale running job:", t.scanId);
    } else {
      return { ok: false, code: "SCAN_IN_PROGRESS", message: "A scan is already running. Cancel it first." };
    }
  }

  // Robust active tab resolution across sidepanel and multiple windows
  let n = null;
  if (e?.tabId) {
    try { n = await chrome.tabs.get(e.tabId); } catch(err) {}
  }
  if (!n || !n.url) {
    try {
      const focusedTabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      if (focusedTabs && focusedTabs.length > 0 && focusedTabs[0].id) n = focusedTabs[0];
    } catch(err) {}
  }
  if (!n || !n.url) {
    try {
      const curTabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (curTabs && curTabs.length > 0 && curTabs[0].id) n = curTabs[0];
    } catch(err) {}
  }
  if (!n || !n.url) {
    try {
      const allActive = await chrome.tabs.query({ active: true });
      if (allActive && allActive.length > 0 && allActive[0].id) n = allActive[0];
    } catch(err) {}
  }

  if (!n || n.id === undefined) return { ok: false, code: "NO_ACTIVE_TAB", message: "No active tab found. Open a regular web page and try again." };
  const a = cr(n.url);
  if (!a.supported) return { ok: false, code: a.code, message: a.message };

  const s = `scan-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const o = Me.partial().safeParse(e ?? {});
  const i = Me.parse({
    maxNodes: o.success ? o.data.maxNodes : undefined,
    includeAssets: o.success ? o.data.includeAssets : undefined,
    includeCssVariables: o.success ? o.data.includeCssVariables : undefined,
    includeClientScripts: o.success ? o.data.includeClientScripts : undefined
  });
  const d = {
    scanId: s,
    requestId: r,
    tabId: n.id,
    url: n.url ?? "",
    origin: new URL(n.url).origin,
    status: "running",
    progress: 5,
    startedAt: Date.now(),
    updatedAt: Date.now(),
    chunksReceived: 0
  };
  await I(d);
  await Ee("webdna:pendingScan", {
    scanId: s,
    requestId: r,
    maxNodes: i.maxNodes,
    includeAssets: i.includeAssets,
    includeCssVariables: i.includeCssVariables,
    includeClientScripts: i.includeClientScripts
  });
  try {
    await chrome.scripting.executeScript({ target: { tabId: n.id }, files: ["probe.js"] });
  } catch (l) {
    const h = {
      ...d,
      status: "failed",
      progress: 100,
      errorCode: "PERMISSION_DENIED",
      errorMessage: l instanceof Error ? l.message.slice(0, 500) : "Injection failed"
    };
    await I(h);
    await H("webdna:pendingScan");
    return { ok: false, code: "PERMISSION_DENIED", message: h.errorMessage };
  }
  return { ok: true, job: d };
}

async function kr(r, e, t) {
  const n = await Z(Ke(r));
  if (!n || n.status === "cancelled" || n.status === "stale" || (t !== undefined && t !== n.tabId)) return;
  const a = sr.safeParse(e);
  if (!a.success) return;
  const s = a.data;
  const o = (await Z(Se(r))) ?? { seqs: [], nodes: [], snapshot: null };
  if (o.seqs.includes(s.seq)) return;
  o.seqs.push(s.seq);
  if (s.kind === "census" && Array.isArray(s.nodes)) o.nodes.push(...s.nodes);
  if (s.kind === "final" && s.snapshot && typeof s.snapshot === "object") o.snapshot = s.snapshot;
  await Ee(Se(r), o);

  const i = Math.min(90, Math.round((o.seqs.length / s.totalChunks) * 90));
  await I({ ...n, progress: i, chunksReceived: o.seqs.length, chunksExpected: s.totalChunks });

  if (s.kind === "final" && o.snapshot) {
    const d = { ...o.snapshot, nodes: o.nodes };
    const l = er.safeParse(d);
    if (!l.success) {
      const B = l.error.issues.slice(0, 3).map((Er) => Er.path.join(".")).join(", ");
      await I({
        ...n,
        status: "failed",
        progress: 100,
        errorCode: "SCHEMA_MISMATCH",
        errorMessage: `Probe result failed schema validation and was discarded (${B}).`
      });
      await H(Se(r));
      return;
    }
    const h = `rep-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const w = hr(l.data, { reportId: h });
    const U = Ye.safeParse(w);
    if (!U.success) {
    const reportPaths = U.error.issues.slice(0, 5).map((iss) => `${iss.path.join(".")}: ${iss.message}`).join("; ");
      await I({
        ...n,
        status: "failed",
        progress: 100,
        errorCode: "SCHEMA_MISMATCH",
         errorMessage: `Generated report failed schema validation (${reportPaths}).`
      });
      return;
    }
    try {
      await vr(U.data);
    } catch (B) {
      await I({
        ...n,
        status: "failed",
        progress: 100,
        errorCode: "QUOTA_EXCEEDED",
        errorMessage: B instanceof Error ? B.message : "Storage write failed"
      });
      return;
    }
    await I({
      ...n,
      status: U.data.status === "completed" ? "completed" : "partial",
      progress: 100,
      reportId: h
    });
    await H(Se(r));
    await H("webdna:pendingScan");
    await xr({
      protocol: 1,
      requestId: n.requestId,
      scanId: r,
      type: "SCAN_FINISHED",
      createdAt: Date.now(),
      payload: { reportId: h }
    });
  }
}

async function fetchAssetViaTabOrBackground(url) {
  if (!url) return { ok: false, error: "Empty URL" };
  if (url.startsWith("data:")) {
    const comma = url.indexOf(",");
    if (comma === -1) return { ok: false, error: "Malformed data URI" };
    const meta = url.slice(5, comma);
    const body = url.slice(comma + 1);
    const isBase64 = meta.includes(";base64");
    const mime = meta.split(";")[0] || "image/png";
    return {
      ok: true,
      base64: isBase64 ? body : btoa(decodeURIComponent(body)),
      mime
    };
  }
  // 1. Try active tab content-script context first (shares same-origin cookies/CORS with the page!)
  try {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) [tab] = await chrome.tabs.query({ active: true });
    if (tab && tab.id !== undefined) {
      const tabRes = await chrome.tabs.sendMessage(tab.id, {
        type: "PAGE_FETCH_ASSET",
        payload: { url }
      }).catch(() => null);
      if (tabRes && tabRes.ok && tabRes.base64) {
        return tabRes;
      }
    }
  } catch {}

  // 2. Fallback to background fetch
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const buf = await res.arrayBuffer();
    if (buf.byteLength > 25 * 1024 * 1024) return { ok: false, error: "Exceeds 25MB cap" };
    const bytes = new Uint8Array(buf);
    let binary = "";
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }
    return {
      ok: true,
      base64: btoa(binary),
      mime: res.headers.get("content-type") || "application/octet-stream",
      size: bytes.length
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "CORS or network error" };
  }
}

const Tr = Xe(() => {
  chrome.action.onClicked.addListener(async (r) => {
    try {
      if (r.id !== undefined) await chrome.sidePanel.open({ tabId: r.id });
      else await chrome.sidePanel.open({ windowId: r.windowId });
    } catch {}
  });

  chrome.tabs.onUpdated.addListener(async (r, e) => {
    const n = await Z("webdna:currentJob");
    if (!n || n.tabId !== r) return;
    if ((n.status === "queued" || n.status === "running") && e.url && e.url !== n.url) {
      await I({
        ...n,
        status: "stale",
        progress: 100,
        errorCode: "TAB_NAVIGATED",
        errorMessage: "The tab navigated during the scan; the job is stale. Re-scan the new page."
      });
      await H("webdna:pendingScan");
    }
  });

  chrome.tabs.onRemoved.addListener(async (r) => {
    const e = await Z("webdna:currentJob");
    if (e && e.tabId === r && (e.status === "queued" || e.status === "running")) {
      await I({
        ...e,
        status: "stale",
        progress: 100,
        errorCode: "TAB_NAVIGATED",
        errorMessage: "The tab was closed during the scan."
      });
      await H("webdna:pendingScan");
    }
  });

  chrome.runtime.onMessage.addListener((r, e, t) => (
    (async () => {
      const n = ar.safeParse(r);
      if (!n.success) {
        t({ ok: false, error: "SCHEMA_MISMATCH" });
        return;
      }
      const { type: a, payload: s, scanId: o } = n.data;
      try {
        switch (a) {
          case "PROBE_READY": {
            const i = await Z("webdna:currentJob");
            const d = await Z("webdna:pendingScan");
            if (i && d && (i.status === "queued" || i.status === "running") && e.tab?.id !== undefined && e.tab.id === i.tabId && d.scanId === i.scanId) {
              t({ ok: true, pending: d });
            } else {
              t({ ok: false, error: "No pending scan" });
            }
            return;
          }
          case "SCAN_START": {
            if (e.tab && e.url && !e.url.startsWith("chrome-extension://")) {
              t({ ok: false, code: "PERMISSION_DENIED", message: "Scans can only be started from the WebDNA side panel." });
              return;
            }
            t(await wr(n.data.requestId, { ...s?.options, tabId: s?.tabId }));
            return;
          }
          case "SCAN_CANCEL": {
            const i = await Z("webdna:currentJob");
            if (i && (i.status === "queued" || i.status === "running")) {
              await I({ ...i, status: "cancelled", progress: 100, errorMessage: "Cancelled by user." });
              await H("webdna:pendingScan");
              t({ ok: true });
            } else {
              t({ ok: false, error: "No running scan to cancel." });
            }
            return;
          }
          case "SCAN_CHUNK": {
            if (!o) {
              t({ ok: false, error: "Missing scanId" });
              return;
            }
            await kr(o, s, e.tab?.id);
            t({ ok: true });
            return;
          }
          case "SCAN_FAILED": {
            const i = await Z("webdna:currentJob");
            if (i && (i.status === "queued" || i.status === "running")) {
              const d = s?.message ?? "Probe failed";
              await I({ ...i, status: "failed", progress: 100, errorCode: "PROBE_FAILED", errorMessage: d });
            }
            t({ ok: true });
            return;
          }
          case "JOB_GET": {
            const i = await Z("webdna:currentJob");
            const d = i ? rr.safeParse(i) : null;
            t({ ok: true, job: d?.success ? d.data : null });
            return;
          }
          case "REPORT_GET": {
            const i = s?.reportId;
            if (!i) {
              t({ ok: false, error: "Missing reportId" });
              return;
            }
            const d = await yr(i);
            if (!d) {
              t({ ok: false, error: "Report not found" });
              return;
            }
            const l = Ye.safeParse(d);
            t({ ok: true, report: l.success ? l.data : d, schemaValid: l.success });
            return;
          }
          case "HISTORY_LIST": {
            t({ ok: true, items: await _r() });
            return;
          }
          case "HISTORY_DELETE": {
            const i = s?.reportId;
            if (!i) {
              t({ ok: false, error: "Missing reportId" });
              return;
            }
            await br(i);
            t({ ok: true });
            return;
          }
          case "INSPECT_START": {
            let targetTab = null;
            if (s && typeof s === "object" && s.tabId) {
              try { targetTab = await chrome.tabs.get(s.tabId); } catch(err) {}
            }
            if (!targetTab || !targetTab.url) {
              const focusedTabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
              if (focusedTabs && focusedTabs.length > 0 && focusedTabs[0].id) targetTab = focusedTabs[0];
            }
            if (!targetTab || !targetTab.url) {
              let [tTab] = await chrome.tabs.query({ active: true, currentWindow: true });
              if (tTab) targetTab = tTab;
            }
            if (!targetTab || !targetTab.url) {
              let [tTab] = await chrome.tabs.query({ active: true });
              if (tTab) targetTab = tTab;
            }
            if (!targetTab || targetTab.id === undefined) {
              t({ ok: false, error: "No active tab found. Click on a regular web page and try again." });
              return;
            }
            const check = cr(targetTab.url);
            if (!check.supported) {
              t({ ok: false, error: check.message });
              return;
            }
            try {
              await chrome.scripting.executeScript({ target: { tabId: targetTab.id }, files: ["probe.js"] }).catch(() => {});
              await chrome.tabs.sendMessage(targetTab.id, { type: "INSPECT_PICK_START" });
              t({ ok: true });
            } catch (err) {
              t({ ok: false, error: err instanceof Error ? err.message : "Could not start element picker on this tab." });
            }
            return;
          }
          case "INSPECT_CANCEL": {
            let targetTab = null;
            if (s && typeof s === "object" && s.tabId) {
              try { targetTab = await chrome.tabs.get(s.tabId); } catch(err) {}
            }
            if (!targetTab) {
              const focusedTabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
              if (focusedTabs && focusedTabs.length > 0) targetTab = focusedTabs[0];
            }
            if (!targetTab) {
              let [tTab] = await chrome.tabs.query({ active: true, currentWindow: true });
              if (tTab) targetTab = tTab;
            }
            if (targetTab && targetTab.id !== undefined) {
              await chrome.tabs.sendMessage(targetTab.id, { type: "INSPECT_PICK_CANCEL" }).catch(() => {});
            }
            t({ ok: true });
            return;
          }
          case "INSPECT_RESULT": {
            await Ee("webdna:lastInspected", s);
            await xr({
              protocol: 1,
              requestId: `inspect-notify-${Date.now()}`,
              type: "INSPECT_RESULT",
              createdAt: Date.now(),
              payload: s
            });
            t({ ok: true });
            return;
          }
          case "INSPECT_GET": {
            const last = await Z("webdna:lastInspected");
            t({ ok: true, inspected: last ?? null });
            return;
          }
          case "ASSET_FETCH_ONE": {
            const url = s?.url;
            const res = await fetchAssetViaTabOrBackground(url);
            t(res);
            return;
          }
          case "HEARTBEAT": {
            t({ ok: true, at: Date.now() });
            return;
          }
          default:
            t({ ok: false, error: `Unsupported message type: ${a}` });
        }
      } catch (i) {
        t({ ok: false, error: i instanceof Error ? i.message : "UNKNOWN" });
      }
    })(),
    true
  ));
});


// ── WEBDNA MCP AI AGENT BRIDGE (Auto-connects to localhost:8765) ─────────────
(function startMcpBridge() {
  const BRIDGE_URL = "http://127.0.0.1:8765";
  let isConnected = false;

  async function sendHeartbeat() {
    try {
      let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      if (!tab) [tab] = await chrome.tabs.query({ active: true });
      if (tab) {
        await fetch(BRIDGE_URL + "/heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tabId: tab.id, url: tab.url, title: tab.title })
        }).catch(function() {});
      }
    } catch(err) {}
  }

  async function connectBridge() {
    try {
      const res = await fetch(BRIDGE_URL + "/status").catch(function() { return null; });
      if (!res || !res.ok) {
        setTimeout(connectBridge, 5000);
        return;
      }
      isConnected = true;
      sendHeartbeat();

      const sseRes = await fetch(BRIDGE_URL + "/events");
      const reader = sseRes.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const item = await reader.read();
        if (item.done) break;
        buffer += decoder.decode(item.value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (const part of parts) {
          if (part.indexOf("event: scan_request") >= 0) {
            const dataMatch = /data:\s*(.+)/.exec(part);
            if (dataMatch) {
              try {
                const cmd = JSON.parse(dataMatch[1]);
                handleMcpScan(cmd);
              } catch(e) {}
            }
          }
        }
      }
    } catch(err) {
      isConnected = false;
      setTimeout(connectBridge, 5000);
    }
  }

  async function handleMcpScan(cmd) {
    const requestId = cmd.requestId;
    const url = cmd.url;
    const options = cmd.options || {};
    try {
      let targetTabId = undefined;
      if (url) {
        const newTab = await chrome.tabs.create({ url: url, active: true });
        targetTabId = newTab.id;
        await new Promise(function(r) { setTimeout(r, 3500); });
      } else {
        const curTabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        if (curTabs && curTabs.length > 0) targetTabId = curTabs[0].id;
      }

      const scanRes = await wr(requestId, { ...options, tabId: targetTabId });
      if (!scanRes || !scanRes.ok) {
        await fetch(BRIDGE_URL + "/result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requestId: requestId, ok: false, error: scanRes?.message || "Scan failed to initiate" })
        }).catch(function() {});
        return;
      }

      let tries = 0;
      const poll = setInterval(async function() {
        tries++;
        const job = await Z("webdna:currentJob");
        if (job && (job.status === "completed" || job.status === "partial") && job.reportId) {
          clearInterval(poll);
          const rep = await yr(job.reportId);
          await fetch(BRIDGE_URL + "/result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ requestId: requestId, ok: true, report: rep })
          }).catch(function() {});
        } else if (job && (job.status === "failed" || job.status === "stale")) {
          clearInterval(poll);
          await fetch(BRIDGE_URL + "/result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ requestId: requestId, ok: false, error: job.errorMessage || "Scan failed" })
          }).catch(function() {});
        } else if (tries > 60) {
          clearInterval(poll);
          await fetch(BRIDGE_URL + "/result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ requestId: requestId, ok: false, error: "Scan timed out after 60 seconds" })
          }).catch(function() {});
        }
      }, 1000);
    } catch(err) {
      await fetch(BRIDGE_URL + "/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: requestId, ok: false, error: err.message })
      }).catch(function() {});
    }
  }

  setInterval(sendHeartbeat, 10000);
  connectBridge();
})();

let Pe;
try {
  Pe = Tr.main();
} catch (r) {
  throw r;
}
return Pe;
})();
